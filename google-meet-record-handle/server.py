from flask import Flask, request, jsonify
import subprocess
import os
import uuid
import traceback
import requests
from convert.audioConverter import convert_video_to_wav
from convert.transcibe import transcribe_audio
from convert.summarize import summarize_transcript
# from db.database import init_db, save_transcript, get_transcript
# from db.database import init_db, update_recording_status, get_recording_status

app = Flask(__name__)

# Backend endpoint configuration
BACKEND_URL = os.getenv('BACKEND_URL', 'http://localhost:3000')  # Default backend URL
TRANSCRIPT_ENDPOINT = f"{BACKEND_URL}/profile/uploadtranscript"  # Endpoint for sending transcripts

# Initialize database on startup
# init_db()

def send_transcript_to_backend(recording_id, transcript_text):
    """
    Send transcript to another backend endpoint.
    
    Args:
        recording_id (str): ID of the recording
        transcript_text (str): The transcribed text
    
    Returns:
        tuple: (success, response_data)
    """
    try:
        payload = {
            "recording_id": recording_id,
            "transcript_text": transcript_text
        }
        
        response = requests.post(
            TRANSCRIPT_ENDPOINT,
            json=payload,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            return True, response.json()
        else:
            print(f"Backend request failed with status {response.status_code}: {response.text}")
            return False, response.text
            
    except Exception as e:
        print(f"Error sending transcript to backend: {str(e)}")
        return False, str(e)

@app.route('/record_meeting', methods=['POST'])
def record_meeting():
    # Get meeting details from request
    data = request.json

    if not data or 'meeting_link' not in data:
        return jsonify({"error": "Meeting link is required"}), 400

    # Generate a unique ID for this recording
    recording_id = data['meeting_link'].split('/')[-1]

    # Get current working directory and debug path information
    current_dir = os.getcwd()
    print(f"Current working directory: {current_dir}")

    # Create directories for this recording
    recordings_dir = os.path.join(current_dir, "recordings", recording_id)
    screenshots_dir = os.path.join(current_dir, "screenshots", recording_id)

    print(f"Attempting to create recordings directory: {recordings_dir}")
    print(f"Attempting to create screenshots directory: {screenshots_dir}")

    # Debug directory permissions
    parent_screenshots = os.path.join(current_dir, "screenshots")
    if os.path.exists(parent_screenshots):
        print(f"Screenshots directory exists with permissions: {oct(os.stat(parent_screenshots).st_mode)[-3:]}")
    else:
        print(f"Creating parent screenshots directory: {parent_screenshots}")
        try:
            os.makedirs(parent_screenshots, exist_ok=True)
            print("Parent screenshots directory created successfully")
        except Exception as e:
            print(f"Failed to create parent screenshots directory: {str(e)}")
            print(traceback.format_exc())

    # Debug directory creation with detailed error reporting
    try:
        # Create recordings directory
        print("Creating recordings directory...")
        os.makedirs(recordings_dir, exist_ok=True)
        print(f"Recordings directory created successfully: {os.path.exists(recordings_dir)}")

        # Create screenshots directory with extra debugging
        print("Creating screenshots directory...")
        try:
            # Try to create intermediate directories
            parent_dir = os.path.dirname(screenshots_dir)
            print(f"Ensuring parent directory exists: {parent_dir}")
            os.makedirs(parent_dir, exist_ok=True)

            # Now create the screenshots subdirectory
            print(f"Creating screenshots subdirectory: {screenshots_dir}")
            os.mkdir(screenshots_dir)
            print(f"Screenshots directory created successfully: {os.path.exists(screenshots_dir)}")
        except Exception as screenshots_error:
            print(f"Error creating screenshots directory: {str(screenshots_error)}")
            print(f"Error type: {type(screenshots_error)}")
            print(traceback.format_exc())
            return jsonify({"error": f"Screenshots directory creation failed: {str(screenshots_error)}"}), 500

    except Exception as e:
        print(f"Directory setup error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": f"Failed to set up directories: {str(e)}"}), 500

    # Verify directories were created
    print("Verifying directories...")
    print(f"Recordings directory exists: {os.path.exists(recordings_dir)}")
    print(f"Screenshots directory exists: {os.path.exists(screenshots_dir)}")

    if not os.path.isdir(recordings_dir):
        return jsonify({"error": "Failed to verify recordings directory creation"}), 500

    if not os.path.isdir(screenshots_dir):
        return jsonify({"error": "Failed to verify screenshots directory creation"}), 500

    # Set up command
    run_cmd = ["python3", "gmeet.py", data['meeting_link'], recording_id]
    print(f"Running command: {' '.join(run_cmd)}")

    process = subprocess.Popen(
        run_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    stdout_logs = []
    stderr_logs = []

    while True:
        stdout_line = process.stdout.readline()
        stderr_line = process.stderr.readline()

        if stdout_line:
            stdout_logs.append(stdout_line)
            print(f"STDOUT: {stdout_line.strip()}")

        if stderr_line:
            stderr_logs.append(stderr_line)
            print(f"STDERR: {stderr_line.strip()}")

        if stdout_line == '' and stderr_line == '' and process.poll() is not None:
            break

    # Check process result
    if process.returncode != 0:
        return jsonify({
            "error": "gmeet.py failed",
            "details": ''.join(stderr_logs)
        }), 500

    return jsonify({
        "recording_id": recording_id,
        "status": "started",
        "message": "Meeting recording has been started",
        "logs": ''.join(stdout_logs)
    })


@app.route('/recording_status/<recording_id>', methods=['GET'])
def recording_status(recording_id):
    # Check if recording exists
    recordings_dir = f"recordings/{recording_id}"
    if not os.path.exists(recordings_dir):
        return jsonify({"error": "Recording not found"}), 404

    # Check for output file
    output_file = f"{recordings_dir}/output.mp4"
    transcript_file = f"{recordings_dir}/transcript.json"

    if os.path.exists(transcript_file):
        return jsonify({
            "recording_id": recording_id,
            "status": "completed",
            "output_file": output_file,
            "transcript_file": transcript_file
        })
    elif os.path.exists(output_file):
        return jsonify({
            "recording_id": recording_id,
            "status": "processing",
            "output_file": output_file
        })
    else:
        return jsonify({
            "recording_id": recording_id,
            "status": "in_progress"
        })


@app.route('/process_recording/<recording_id>', methods=['POST'])
def process_recording(recording_id):
    try:
        # Get the current working directory
        current_dir = os.getcwd()
        print(f"Current working directory: {current_dir}")

        # Construct paths
        video_path = os.path.join(current_dir, "recordings", recording_id, "output.mp4")
        audio_path = os.path.join(current_dir, "audios", f"{recording_id}.wav")
        transcript_path = os.path.join(current_dir, "transcripts", f"{recording_id}.txt")
        model_path = os.path.join(current_dir, "vosk-model-small-en-us-0.15")

        print(f"Video path: {video_path}")
        print(f"Audio path: {audio_path}")
        print(f"Transcript path: {transcript_path}")

        # Step 1: Convert video to audio
        if not os.path.exists(video_path):
            return jsonify({
                "error": "Video file not found",
                "recording_id": recording_id,
                "video_path": video_path
            }), 404

        # Ensure audio directory exists
        os.makedirs(os.path.dirname(audio_path), exist_ok=True)

        # Convert video to audio
        audio_result = convert_video_to_wav(video_path, audio_path)
        if audio_result is None:
            return jsonify({
                "error": "Failed to convert video to audio",
                "recording_id": recording_id
            }), 500

        # Step 2: Transcribe audio
        transcript_text = transcribe_audio(audio_path, model_path)
        if transcript_text is None:
            return jsonify({
                "error": "Failed to transcribe audio",
                "recording_id": recording_id
            }), 500

        # Save transcript to file
        try:
            # Ensure transcripts directory exists
            os.makedirs(os.path.dirname(transcript_path), exist_ok=True)
            
            # Write transcript to file
            with open(transcript_path, 'w') as f:
                f.write(transcript_text)
            print(f"Transcript saved to {transcript_path}")
        except Exception as e:
            print(f"Error saving transcript to file: {str(e)}")
            return jsonify({
                "error": "Failed to save transcript to file",
                "recording_id": recording_id,
                "details": str(e)
            }), 500

        # Step 3: Send transcript to backend
        backend_success, backend_response = send_transcript_to_backend(recording_id, transcript_text)
        if not backend_success:
            print(f"Warning: Failed to send transcript to backend: {backend_response}")

        return jsonify({
            "status": "success",
            "recording_id": recording_id,
            "audio_path": audio_path,
            "transcript_path": transcript_path,
            "transcript": transcript_text,
            "backend_response": backend_response if backend_success else None
        })

    except Exception as e:
        print(f"Error processing recording: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            "error": f"Failed to process recording: {str(e)}",
            "recording_id": recording_id
        }), 500


@app.route('/summarize/<recording_id>', methods=['POST'])
def summarize(recording_id):
    try:
        # Get the current working directory
        current_dir = os.getcwd()
        print(f"Current working directory: {current_dir}")

        # Construct paths
        transcript_path = os.path.join(current_dir, "Transcript", "output.txt")
        summary_path = os.path.join(current_dir, "summaries", f"{recording_id}.txt")

        print(f"Transcript path: {transcript_path}")
        print(f"Summary path: {summary_path}")

        # Check if transcript file exists
        if not os.path.exists(transcript_path):
            return jsonify({
                "error": "Transcript file not found",
                "recording_id": recording_id,
                "transcript_path": transcript_path
            }), 404

        # Get Gemini API key from environment variable
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            return jsonify({
                "error": "Gemini API key not found in environment variables",
                "recording_id": recording_id
            }), 500

        # Generate summary
        result = summarize_transcript(transcript_path, summary_path, api_key)

        if result is None:
            return jsonify({
                "error": "Failed to generate summary",
                "recording_id": recording_id,
                "transcript_path": transcript_path
            }), 500

        return jsonify({
            "status": "success",
            "recording_id": recording_id,
            "summary_path": summary_path
        })

    except Exception as e:
        print(f"Error generating summary: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            "error": f"Failed to generate summary: {str(e)}",
            "recording_id": recording_id,
            "transcript_path": transcript_path
        }), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

import subprocess
import os
from pathlib import Path


def convert_video_to_wav(video_path, output_path=None):
    """
    Convert a video file to WAV audio format using FFmpeg.

    Args:
        video_path (str): Path to the video file
        output_path (str, optional): Path to save the output WAV file.
                                     If not provided, uses the same name as the video file.

    Returns:
        str: Path to the converted WAV file
    """
    # Ensure video path exists
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    # Create output path if not provided
    if output_path is None:
        video_name = Path(video_path).stem
        output_path = f"{video_name}.wav"

    try:
        # Run FFmpeg command to convert video to WAV
        command = [
            "ffmpeg",
            "-i", video_path,  # Input file
            "-vn",            # Disable video
            "-acodec", "pcm_s16le",  # Audio codec for WAV
            "-ar", "44100",   # Sample rate
            "-ac", "2",       # Number of audio channels (stereo)
            output_path       # Output file
        ]

        # Execute the command
        subprocess.run(command, check=True)

        print(f"Successfully converted {video_path} to {output_path}")
        return output_path

    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")
        return None


if __name__ == "__main__":
    input_path = "/home/entity/coding/mrlink/gmeet/recordings/nug-gptm-xqi/output.mp4"
    output_path = "/home/entity/coding/mrlink/gmeet/audios/audio.wav"
    convert_video_to_wav(input_path, output_path)

from vosk import Model, KaldiRecognizer
import wave
import json

def transcribe_audio(audio_path, model_path):
    """
    Transcribe audio file to text using Vosk model.
    
    Args:
        audio_path (str): Path to the audio file
        model_path (str): Path to the Vosk model directory
    
    Returns:
        str: The transcribed text if successful, None if failed
    """
    try:
        # Open audio file
        wf = wave.open(audio_path, "rb")
        
        # Load model and create recognizer
        model = Model(model_path)
        rec = KaldiRecognizer(model, wf.getframerate())
        
        text = ""
        
        # Process audio in chunks
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                text += result.get("text", "") + " "
        
        # Get final result
        final_result = json.loads(rec.FinalResult())
        text += final_result.get("text", "")
        
        return text.strip()
        
    except Exception as e:
        print(f"Error during transcription: {str(e)}")
        return None

if __name__ == "__main__":
    # Example usage
    audio_path = "/path/to/audio.wav"
    model_path = "/path/to/vosk-model"
    transcript = transcribe_audio(audio_path, model_path)
    if transcript:
        print("Transcription successful!")
        print(transcript)
    else:
        print("Transcription failed!")

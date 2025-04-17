

# Auto Meet



##  How It Works

1. **Start Recording**  
   - The server triggers `gmeet.py` using `subprocess`, passing the meeting link and a generated recording ID.
   - `gmeet.py` records the meeting and saves the video to `recordings/{recording_id}/output.mp4`.

2. **Process the Recording**  
   - Convert the recorded video to audio.
   - Transcribe the audio to text using the Vosk speech-to-text model.
   - Save the transcript locally and send it to a backend API endpoint.

3. **Summarize the Meeting**  
   - Using the Gemini API, it reads the transcript and generates a summary, saving it to `summaries/{recording_id}.txt`.

---

##  API Endpoints

### `POST /record_meeting`

**Description:**  
Starts recording a meeting by calling `gmeet.py` with the provided Google Meet link.

**Request Body:**
```json
{
  "meeting_link": "https://meet.google.com/xyz-abc-def"
}
```

**Response:**
```json
{
  "recording_id": "xyz-abc-def",
  "status": "started",
  "message": "Meeting recording has been started"
}
```

---

### `GET /recording_status/<recording_id>`

**Description:**  
Check the current status of a recording.

**Response when in progress:**
```json
{
  "recording_id": "xyz-abc-def",
  "status": "in_progress"
}
```

**Response when recording is done, but transcript is processing:**
```json
{
  "recording_id": "xyz-abc-def",
  "status": "processing",
  "output_file": "recordings/xyz-abc-def/output.mp4"
}
```

**Response when transcript is ready:**
```json
{
  "recording_id": "xyz-abc-def",
  "status": "completed",
  "output_file": "recordings/xyz-abc-def/output.mp4",
  "transcript_file": "recordings/xyz-abc-def/transcript.json"
}
```

---

### `POST /process_recording/<recording_id>`

**Description:**  
Processes a completed video recording:
- Converts it to audio
- Transcribes audio to text
- Saves transcript locally
- Sends transcript to backend API

**Response:**
```json
{
  "status": "success",
  "recording_id": "xyz-abc-def",
  "audio_path": "audios/xyz-abc-def.wav",
  "transcript_path": "transcripts/xyz-abc-def.txt",
  "transcript": "Full transcribed text here",
  "backend_response": {
    
  }
}
```

---

### `POST /summarize/<recording_id>`

**Description:**  
Summarizes the transcript using the Gemini API and saves it to a file.

**Response:**
```json
{
  "status": "success",
  "recording_id": "xyz-abc-def",
  "summary_path": "summaries/xyz-abc-def.txt"
}
```

---

##  Environment Variables

Create a `.env` file or set these variables in your environment:
```bash
BACKEND_URL=http://localhost:8000
GEMINI_API_KEY=your_gemini_api_key
```

---

##  Dependencies

- **Flask** — Web server
- **subprocess** — Running external scripts
- **requests** — For HTTP calls to backend
- **vosk** — For offline speech recognition
- **FFmpeg** — For audio/video conversion (used inside `audioConverter.py`)

---

## Run the Server

```bash
python3 app.py
```

Server will start at:
```
http://localhost:5000
```

---

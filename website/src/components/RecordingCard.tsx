import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface RecordingCardProps {
  onTranscriptionComplete: (transcription: string) => void;
}

const RecordingCard = ({ onTranscriptionComplete }: RecordingCardProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // Initialize WebSocket connection
      const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
        'token',
        import.meta.env.VITE_DEEPGRAM_API_KEY || ''
      ]);

      socketRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connection established');
        setIsRecording(true);
        toast({
          title: "Recording Started",
          description: "Your audio is being recorded and transcribed live",
        });
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.channel?.alternatives?.[0]?.transcript) {
          const transcript = data.channel.alternatives[0].transcript;
          setLiveTranscript(prev => prev + " " + transcript);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast({
          title: "Error",
          description: "Failed to connect to transcription service",
          variant: "destructive",
        });
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      // Process audio data
      processor.onaudioprocess = (e) => {
        if (socket.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcmData = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
          }
          socket.send(pcmData.buffer);
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = async () => {
    if (!socketRef.current || !audioContextRef.current || !processorRef.current) return;

    try {
      // Close WebSocket connection
      socketRef.current.close();
      
      // Clean up audio processing
      processorRef.current.disconnect();
      audioContextRef.current.close();
      
      setIsRecording(false);
      setIsProcessing(true);
      
      // Finalize transcription
      onTranscriptionComplete(liveTranscript);
      
      toast({
        title: "Recording Stopped",
        description: "Transcription completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stop recording",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Record & Transcribe</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Record your voice and get instant transcription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center gap-2 ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-5 w-5" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Start Recording
                  </>
                )}
              </Button>
              {isRecording && liveTranscript && (
                <div className="w-full mt-4 p-4 bg-white rounded-lg shadow">
                  <p className="text-gray-800 whitespace-pre-wrap">{liveTranscript}</p>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordingCard; 
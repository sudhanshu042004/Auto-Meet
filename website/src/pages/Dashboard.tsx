import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Circle, Clock, Dot, FileText, Video, Send } from "lucide-react";
import RecordingCard from "@/components/RecordingCard";
import { useMeeting } from "@/context/MeetingContext";

// This is a simplified example - in a real app you would use react-hook-form
const Dashboard = () => {
  const navigate = useNavigate();
  const { pendingMeetings, loading, setMeetings } = useMeeting();
  const [meetingLink, setMeetingLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [latestId, setLatestId] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [isProcessingChat, setIsProcessingChat] = useState(false);

  const handleTranscriptionComplete = (text: string) => {
    setTranscription(text);
    setChatHistory([{ role: "system", content: text }]);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !transcription) return;

    const userMessage = chatMessage;
    setChatMessage("");
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setIsProcessingChat(true);

    try {
      // Use Deepgram's LLM to analyze the transcription and chat
      const { result, error } = await deepgram.llm.chat({
        model: "deepgram-llm",
        messages: [
          { role: "system", content: `Here is the context from the transcription: ${transcription}` },
          ...chatHistory,
          { role: "user", content: userMessage }
        ]
      });

      if (error) throw error;

      const assistantResponse = result?.choices[0]?.message?.content || "Sorry, I couldn't process that.";
      setChatHistory(prev => [...prev, { role: "assistant", content: assistantResponse }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process chat message",
        variant: "destructive",
      });
    } finally {
      setIsProcessingChat(false);
    }
  };

  const handleTranscript = async(meeting) =>{
    console.log(meeting);
    const result = await fetch(`http://localhost:5000/process_recording/${meeting.meetingId}`,{
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body : JSON.stringify({meetingId : meeting.id})
    });
    const res = await result.json();
    if(res.status === "success"){
      toast({
          title : "successfully transcripted"
      })
      console.log(res);
      setMeetings((prevMeetings) => {
        return prevMeetings.map((m) => {
          if (m.id === meeting.id) {
            return { ...m, status: "completed" };
          }
          return m;
        });
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!meetingLink) {
      toast({
        title: "Error",
        description: "Please enter a meeting link",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setIsLive(true);
    
    try {
      const response = await fetch('http://localhost:5000/record_meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ meeting_link: meetingLink })
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }

      const data = await response.json();
      setLatestId(data.data.meetingId);
      
      toast({
        title: "Success",
        description: "Meeting created successfully",
      });
      
      setMeetingLink("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create meeting",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsLive(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-gray-600">Manage your meetings and view summaries</p>
      </div>
      
      {/* Stats */}
      {/* <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-lg rounded-lg">
            <CardContent className="p-6">
          <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
      
      <div>
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <div>
            {!isLive ? (
              <div className="flex gap-1">
                <div className="flex relative justify-center items-center pb-2">
                  <Circle className="h-12 w-12 text-gray-500/5" />
                </div>
                <div className="text-3xl font-bold text-gray-800 pt-1">
                  Meeting is not live right now
                </div>
              </div>
            ) : (
              <div className="flex gap-1">
                <div className="flex relative justify-center items-center pb-2">
                  <Circle className="h-12 w-12 text-green-500" />
                  <Circle className="absolute h-12 w-12 text-green-500 animate-ping" />
                </div>
                <div className="text-3xl font-bold text-gray-800 pt-1">
                  Meeting is live
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Pending Meetings */}
      {pendingMeetings.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Transcripts</h2>
          <div className="space-y-3">
            {pendingMeetings.map((meeting) => (
              <Card key={meeting.id} className="bg-white shadow-lg rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{meeting.meetingId}</h3>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(meeting.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTranscript(meeting)}
                      >
                        Process
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Join Meeting Card */}
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">Join a Meeting</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Enter a meeting link and our bot will attend for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <Input
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="Paste Google Meet, or Teams link here..."
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              {isSubmitting ? "Joining..." : "Send Bot to Join"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {
        latestId && 
      <div>
      <h2 className="text-xl font-bold text-gray-800">Meeting hasn't been Transcripted</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={()=>handleTranscript(latestId)}  >
        <div className=" font-bold " >{latestId}</div>
        <div className="text-muted-foreground text-sm " >tap to transcript the recording</div>
      </div>
      </div>
        }

      {/* Recent Meetings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Meetings</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/meetings")}>
            View all
          </Button>
        </div>
        
        {/* <div className="space-y-3">
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="bg-white shadow-lg rounded-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{meeting.title}</h3>
                    <p className="text-sm text-muted-foreground">{meeting.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      meeting.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    )}>
                      {meeting.status}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/dashboard/meetings/${meeting.id}`)}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>

      {/* Recording Card */}
      {/* <RecordingCard onTranscriptionComplete={handleTranscriptionComplete} /> */}

      {/* Transcription Display */}
      {transcription && (
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Transcription</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Your recorded content has been transcribed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">{transcription}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Section */}
      {transcription && (
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Chat about the Transcription</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Ask questions about the transcribed content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[80%] ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isProcessingChat && (
                  <div className="text-left">
                    <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isProcessingChat}
                />
                <Button type="submit" disabled={isProcessingChat}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default Dashboard;
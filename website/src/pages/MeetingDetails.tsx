
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Download, MessageSquare, Users, Video } from "lucide-react";

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");
  
  // Mock meeting data - in a real app, you'd fetch this based on the ID
  const meeting = {
    id,
    title: "Weekly Team Standup",
    date: "April 17, 2025",
    time: "9:30 AM",
    duration: "30 minutes",
    status: "completed",
    participants: [
      { id: "1", name: "John Doe", role: "Product Manager" },
      { id: "2", name: "Sarah Johnson", role: "Designer" },
      { id: "3", name: "Mike Wilson", role: "Developer" },
      { id: "4", name: "Emily Brown", role: "Marketing" },
    ],
    summary: "The team discussed progress on the new dashboard feature. Development is on track for the end of the month. Design team will deliver final mockups by Friday. Marketing is preparing the launch materials.",
    keyPoints: [
      "Dashboard feature on track for month-end delivery",
      "Design mockups to be completed by Friday",
      "Marketing team to prepare launch materials",
      "Next sprint planning scheduled for Monday"
    ],
    actionItems: [
      { item: "Review design mockups", assignee: "John Doe", dueDate: "Apr 19" },
      { item: "Complete API integration", assignee: "Mike Wilson", dueDate: "Apr 22" },
      { item: "Prepare launch blog post", assignee: "Emily Brown", dueDate: "Apr 25" }
    ],
    transcript: [
      { time: "00:00", speaker: "John Doe", text: "Good morning everyone, let's get started with our weekly standup." },
      { time: "00:10", speaker: "Sarah Johnson", text: "I've been working on the dashboard mockups and should have them ready by Friday." },
      { time: "00:25", speaker: "Mike Wilson", text: "I'm making good progress on the backend API for the dashboard. Should be ready for integration testing by Wednesday." },
      { time: "00:42", speaker: "Emily Brown", text: "I've started drafting the launch materials for the marketing campaign." },
      { time: "01:03", speaker: "John Doe", text: "Sounds good. Any blockers anyone wants to discuss?" },
      { time: "01:12", speaker: "Mike Wilson", text: "I might need some clarification on a few design specifications. Sarah, can we meet later today?" },
      { time: "01:22", speaker: "Sarah Johnson", text: "Sure, I'm free after lunch." },
      { time: "01:28", speaker: "John Doe", text: "Great! Let's wrap up then. Thanks everyone." },
      // Additional transcript lines would go here
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/meetings")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{meeting.title}</h1>
        <Badge variant={meeting.status === "completed" ? "secondary" : "default"}>
          {meeting.status === "completed" ? "Completed" : "Scheduled"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Meeting info card */}
        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{meeting.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{meeting.time} • {meeting.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span>Google Meet</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{meeting.participants.length} Participants</span>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Participants</h3>
              <div className="space-y-2">
                {meeting.participants.map((participant) => (
                  <div key={participant.id} className="text-sm">
                    <div className="font-medium">{participant.name}</div>
                    <div className="text-muted-foreground">{participant.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Meeting content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{meeting.summary}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {meeting.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Action Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meeting.actionItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{item.item}</div>
                          <div className="text-sm text-muted-foreground">
                            Assigned to {item.assignee} • Due {item.dueDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ask AI about this meeting</CardTitle>
                  <CardDescription>
                    Ask questions about anything discussed in this meeting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="text-muted-foreground" 
                      onClick={() => navigate(`/dashboard/chat?meetingId=${id}`)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat with AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transcript" className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Full Transcript</h2>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {meeting.transcript.map((entry, index) => (
                      <div key={index} className="pb-4 last:pb-0 border-b last:border-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">{entry.time}</span>
                          <span className="font-medium">{entry.speaker}</span>
                        </div>
                        <p>{entry.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;

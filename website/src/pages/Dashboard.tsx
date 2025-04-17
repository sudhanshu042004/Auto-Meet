import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Clock, FileText, Video } from "lucide-react";

// This is a simplified example - in a real app you would use react-hook-form
const Dashboard = () => {
  const navigate = useNavigate();
  const [meetingLink, setMeetingLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success",
        description: "Bot is joining your meeting",
      });
      
      // Reset form
      setMeetingLink("");
      
      // Navigate to a meeting details page (to be implemented)
      // navigate(`/dashboard/meetings/${meetingId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data for dashboard stats and recent meetings
  const stats = [
    { label: "Total Meetings", value: "12", icon: <Video className="h-5 w-5 text-blue-500" /> },
    { label: "This Week", value: "3", icon: <Clock className="h-5 w-5 text-indigo-500" /> },
    { label: "Transcripts", value: "10", icon: <FileText className="h-5 w-5 text-green-500" /> },
  ];
  
  const recentMeetings = [
    // { id: "1", title: "Weekly Team Standup", date: "Tomorrow at 9:30 AM", status: "Scheduled", transcript: true },
    // { id: "2", title: "Product Review", date: "Yesterday at 2:00 PM", status: "Completed", transcript: true },
    // { id: "3", title: "Client Presentation", date: "Apr 15, 2025", status: "Scheduled", transcript: false },
  ];

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
      
      {/* Recent Meetings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Meetings</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/meetings")}>
            View all
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentMeetings.map((meeting) => (
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
        </div>
      </div>
    </div>
  );
};

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default Dashboard;

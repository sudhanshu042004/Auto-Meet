import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Meetings = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock data for meetings
  const meetings = [
    // { 
    //   id: "1", 
    //   title: "Weekly Team Standup", 
    //   date: "Apr 17, 2025", 
    //   time: "9:30 AM", 
    //   duration: "30 mins",
    //   status: "completed", 
    //   participants: 8,
    //   hasTranscript: true,
    // },
    // { 
    //   id: "2", 
    //   title: "Product Review", 
    //   date: "Apr 16, 2025", 
    //   time: "2:00 PM", 
    //   duration: "1 hour",
    //   status: "completed", 
    //   participants: 5,
    //   hasTranscript: true,
    // },
    // { 
    //   id: "3", 
    //   title: "Client Presentation", 
    //   date: "Apr 19, 2025", 
    //   time: "11:00 AM", 
    //   duration: "45 mins",
    //   status: "scheduled", 
    //   participants: 12,
    //   hasTranscript: false,
    // },
    // { 
    //   id: "4", 
    //   title: "Q1 Review", 
    //   date: "Apr 12, 2025", 
    //   time: "3:00 PM", 
    //   duration: "1.5 hours",
    //   status: "completed", 
    //   participants: 15,
    //   hasTranscript: true,
    // },
    // { 
    //   id: "5", 
    //   title: "Marketing Strategy", 
    //   date: "Apr 10, 2025", 
    //   time: "10:30 AM", 
    //   duration: "1 hour",
    //   status: "completed", 
    //   participants: 6,
    //   hasTranscript: true,
    // },
    // { 
    //   id: "6", 
    //   title: "Budget Planning", 
    //   date: "Apr 22, 2025", 
    //   time: "1:00 PM", 
    //   duration: "2 hours",
    //   status: "scheduled", 
    //   participants: 4,
    //   hasTranscript: false,
    // },
  ];

  // Filter and search meetings
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesFilter = filter === "all" || meeting.status === filter;
    const matchesSearch = meeting.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-800">Meetings</h1>
        <p className="text-muted-foreground mt-1 text-blue-600">View and manage all your meetings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meetings..." 
            className="pl-8 border border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select 
          value={filter} 
          onValueChange={setFilter}
        >
          <SelectTrigger className="w-full sm:w-40 border border-blue-300 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All meetings</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          className="w-full sm:w-auto sm:ml-auto bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          Add Meeting
        </Button>
      </div>

      {/* Meeting List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-blue-600">No meetings found matching your criteria</p>
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => navigate(`/dashboard/meetings/${meeting.id}`)}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-medium text-blue-800">{meeting.title}</h3>
                    <p className="text-sm text-muted-foreground text-blue-600">
                      {meeting.date} • {meeting.time} • {meeting.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 md:mt-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      meeting.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {meeting.status === "completed" ? "Completed" : "Scheduled"}
                    </span>
                    {meeting.hasTranscript && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                        Transcript
                      </span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/meetings/${meeting.id}`);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Meetings;

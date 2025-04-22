import { useEffect, useState } from "react";
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
import { useMeeting } from "@/context/MeetingContext";

const Meetings = () => {
  const navigate = useNavigate();
  const { completedMeetings, loading } = useMeeting();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const filteredMeetings = completedMeetings.filter(meeting =>
    meeting.meetingId.toLowerCase().includes(search.toLowerCase())
  );

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
            <p className="text-muted-foreground text-blue-600">No completed meetings found</p>
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => navigate(`/dashboard/meetings/${meeting.id}`)}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-medium text-blue-800">{meeting.meetingId}</h3>
                    <p className="text-sm text-muted-foreground text-blue-600">
                      Created: {new Date(meeting.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 md:mt-0">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/meetings/${meeting.id}`);
                      }}
                    >
                      View Details
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

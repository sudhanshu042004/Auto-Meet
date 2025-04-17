import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileText, ArrowUpDown } from "lucide-react";

const Transcripts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Mock data for transcripts
  const transcripts = [
    // { 
    //   id: "1", 
    //   meetingId: "1",
    //   meetingTitle: "Weekly Team Standup", 
    //   date: "Apr 17, 2025", 
    //   duration: "30 mins",
    //   speakerCount: 4,
    //   wordCount: 1250,
    // },
    // { 
    //   id: "2", 
    //   meetingId: "2",
    //   meetingTitle: "Product Review", 
    //   date: "Apr 16, 2025", 
    //   duration: "1 hour",
    //   speakerCount: 5,
    //   wordCount: 3500,
    // },
    // { 
    //   id: "3", 
    //   meetingId: "4",
    //   meetingTitle: "Q1 Review", 
    //   date: "Apr 12, 2025", 
    //   duration: "1.5 hours",
    //   speakerCount: 8,
    //   wordCount: 5200,
    // },
    // { 
    //   id: "4", 
    //   meetingId: "5",
    //   meetingTitle: "Marketing Strategy", 
    //   date: "Apr 10, 2025", 
    //   duration: "1 hour",
    //   speakerCount: 6,
    //   wordCount: 2800,
    // },
  ];

  // Handle sorting and filtering
  const sortedAndFilteredTranscripts = [...transcripts]
    .filter(transcript => 
      transcript.meetingTitle.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // Convert dates to comparable format
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-800">Transcripts</h1>
        <p className="text-muted-foreground mt-1 text-blue-600">View and search meeting transcripts</p>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transcripts..." 
            className="pl-8 border border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleSortOrder}
          className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-100"
        >
          <span>Date</span>
          <ArrowUpDown className="h-3.5 w-3.5 text-blue-600" />
        </Button>
      </div>

      {/* Transcript List */}
      <div className="space-y-4">
        {sortedAndFilteredTranscripts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-blue-600">No transcripts found matching your search</p>
          </div>
        ) : (
          sortedAndFilteredTranscripts.map((transcript) => (
            <Card 
              key={transcript.id} 
              className="cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => navigate(`/dashboard/meetings/${transcript.meetingId}?tab=transcript`)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">{transcript.meetingTitle}</h3>
                      <p className="text-sm text-muted-foreground text-blue-600">
                        {transcript.date} • {transcript.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-3 md:mt-0">
                    <div className="text-sm">
                      <span className="text-muted-foreground text-blue-600">Speakers:</span>
                      <span className="ml-1 font-medium text-blue-800">{transcript.speakerCount}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground text-blue-600">Words:</span>
                      <span className="ml-1 font-medium text-blue-800">{transcript.wordCount}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/meetings/${transcript.meetingId}?tab=transcript`);
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

export default Transcripts;

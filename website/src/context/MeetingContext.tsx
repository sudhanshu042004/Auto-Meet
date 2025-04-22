import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

interface Meeting {
  id: string;
  meetingId: string;
  status: 'pending' | 'completed';
  createdBy: number;
  createdAt: string;
}

interface MeetingContextType {
  meetings: Meeting[];
  pendingMeetings: Meeting[];
  completedMeetings: Meeting[];
  loading: boolean;
  error: string | null;
  setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>;
  fetchMeetings: () => Promise<void>;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider = ({ children }: { children: ReactNode }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/meeting/getmeeting', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }

      const data = await response.json();
      setMeetings(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch meetings');
      toast({
        title: "Error",
        description: "Failed to fetch meetings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const pendingMeetings = meetings.filter(meeting => meeting.status === 'pending');
  const completedMeetings = meetings.filter(meeting => meeting.status === 'completed');

  return (
    <MeetingContext.Provider value={{
      meetings,
      pendingMeetings,
      completedMeetings,
      loading,
      error,
      setMeetings,
      fetchMeetings
    }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
}; 

// import { useState, useRef, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { BotIcon, SendIcon } from "lucide-react";

// // Mock meeting data
// const meetings = [
//   { id: "1", title: "Weekly Team Standup", date: "April 17, 2025" },
//   { id: "2", title: "Product Review", date: "April 16, 2025" },
//   { id: "3", title: "Client Presentation", date: "April 15, 2025" },
// ];

// const ChatWithAI = () => {
//   const [searchParams] = useSearchParams();
//   const initialMeetingId = searchParams.get("meetingId") || "";
  
//   const [selectedMeeting, setSelectedMeeting] = useState(initialMeetingId);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Array<{
//     id: string;
//     role: 'user' | 'assistant';
//     content: string;
//     timestamp: Date;
//   }>>([
//     {
//       id: "welcome",
//       role: "assistant",
//       content: initialMeetingId 
//         ? "Hi! I'm your meeting assistant. Ask me anything about this meeting, and I'll help you find the information you need." 
//         : "Hi! I'm your meeting assistant. Select a meeting, and then you can ask me anything about it.",
//       timestamp: new Date(),
//     }
//   ]);
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);
  
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
  
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);
  
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!message.trim()) return;
//     if (!selectedMeeting) {
//       setMessages(prev => [
//         ...prev, 
//         {
//           id: Date.now().toString(),
//           role: "assistant",
//           content: "Please select a meeting first to chat about it.",
//           timestamp: new Date(),
//         }
//       ]);
//       return;
//     }
    
//     // Add user message
//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user' as const,
//       content: message,
//       timestamp: new Date()
//     };
    
//     setMessages(prev => [...prev, userMessage]);
//     setMessage("");
//     setIsLoading(true);
    
//     try {
//       // In a real app, this would be an API call to a backend service
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock AI response based on user question
//       let aiResponse = "";
      
//       if (message.toLowerCase().includes("summary")) {
//         aiResponse = "The key points from this meeting were: 1) Dashboard feature development is on track for month-end delivery, 2) Design mockups will be completed by Friday, 3) The marketing team is preparing launch materials, and 4) Next sprint planning is scheduled for Monday.";
//       } else if (message.toLowerCase().includes("action") || message.toLowerCase().includes("task")) {
//         aiResponse = "The action items from this meeting are: 1) John needs to review design mockups by April 19, 2) Mike needs to complete API integration by April 22, and 3) Emily needs to prepare the launch blog post by April 25.";
//       } else if (message.toLowerCase().includes("who")) {
//         aiResponse = "The meeting participants were John Doe (Product Manager), Sarah Johnson (Designer), Mike Wilson (Developer), and Emily Brown (Marketing).";
//       } else if (message.toLowerCase().includes("when") || message.toLowerCase().includes("next")) {
//         aiResponse = "The next meeting is scheduled for Monday, April 20, 2025 at 10:00 AM.";
//       } else {
//         aiResponse = "Based on the meeting transcript, the team discussed progress on the dashboard feature which is on track for delivery by the end of the month. The design team is finalizing mockups, and the marketing team is preparing launch materials. Would you like more specific information about any of these topics?";
//       }
      
//       setMessages(prev => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           role: 'assistant',
//           content: aiResponse,
//           timestamp: new Date()
//         }
//       ]);
//     } catch (error) {
//       setMessages(prev => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           role: 'assistant',
//           content: "I'm sorry, I couldn't process your request. Please try again.",
//           timestamp: new Date()
//         }
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const selectedMeetingData = meetings.find(m => m.id === selectedMeeting);
  
//   return (
//     <div className="space-y-6 h-[calc(100vh-10rem)]">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">AI Chat</h1>
//         <p className="text-muted-foreground mt-1">
//           Chat with AI about your meeting content
//         </p>
//       </div>
      
//       <div className="flex flex-col h-[calc(100vh-14rem)]">
//         <div className="mb-4">
//           <Select
//             value={selectedMeeting}
//             onValueChange={setSelectedMeeting}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select a meeting" />
//             </SelectTrigger>
//             <SelectContent>
//               {meetings.map((meeting) => (
//                 <SelectItem key={meeting.id} value={meeting.id}>
//                   {meeting.title} ({meeting.date})
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
          
//           {selectedMeetingData && (
//             <p className="text-sm text-muted-foreground mt-2">
//               Chatting about: <span className="font-medium">{selectedMeetingData.title}</span>
//             </p>
//           )}
//         </div>
        
//         <Card className="flex-1 mb-4 overflow-hidden">
//           <CardContent className="p-4 flex flex-col h-full">
//             <div className="flex-1 overflow-y-auto pb-4 space-y-4">
//               {messages.map(msg => (
//                 <div
//                   key={msg.id}
//                   className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   {msg.role === 'assistant' && (
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback className="bg-primary/10 text-primary">
//                         <BotIcon className="h-4 w-4" />
//                       </AvatarFallback>
//                     </Avatar>
//                   )}
                  
//                   <div
//                     className={`rounded-lg px-4 py-2 max-w-[80%] ${
//                       msg.role === 'user'
//                         ? 'bg-primary text-primary-foreground'
//                         : 'bg-muted'
//                     }`}
//                   >
//                     <p>{msg.content}</p>
//                     <p className="text-xs opacity-70 mt-1">
//                       {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
                  
//                   {msg.role === 'user' && (
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback>JD</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </div>
//               ))}
//               {isLoading && (
//                 <div className="flex justify-start gap-3">
//                   <Avatar className="h-8 w-8">
//                     <AvatarFallback className="bg-primary/10 text-primary">
//                       <BotIcon className="h-4 w-4" />
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="bg-muted rounded-lg px-4 py-2">
//                     <div className="flex space-x-2">
//                       <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
//                       <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
//                       <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
            
//             <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
//               <Input
//                 placeholder={selectedMeeting ? "Ask about this meeting..." : "Select a meeting first..."}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 disabled={!selectedMeeting || isLoading}
//                 className="flex-1"
//               />
//               <Button type="submit" disabled={!selectedMeeting || isLoading}>
//                 <SendIcon className="h-4 w-4" />
//                 <span className="sr-only">Send</span>
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ChatWithAI;

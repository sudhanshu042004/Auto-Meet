// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { BotIcon, Headphones, MessageSquare, VideoIcon } from "lucide-react";

// const LandingPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navigation */}
//       <header className="border-b">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center">
//               <BotIcon className="h-8 w-8 text-primary mr-2" />
//               <span className="text-xl font-bold">autoMeet</span>
//             </div>
//             <div className="hidden md:flex items-center space-x-4">
//               <Link to="#features" className="text-muted-foreground hover:text-foreground transition">Features</Link>
//               <Link to="#how-it-works" className="text-muted-foreground hover:text-foreground transition">How it works</Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Link to="/login">
//                 <Button variant="outline">Log in</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button>Sign up</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero section */}
//       <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
//             Never miss a meeting detail again
//           </h1>
//           <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
//             autoMeet sends an AI assistant to your meetings to capture everything, 
//             create transcripts, and provide intelligent summaries.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link to="/signup">
//               <Button size="lg" className="px-8">Get started for free</Button>
//             </Link>
//             <Link to="#how-it-works">
//               <Button size="lg" variant="outline" className="px-8">See how it works</Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features section */}
//       <section id="features" className="py-20 px-4 bg-white">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-16">Powerful features to enhance your meetings</h2>
          
//           <div className="grid md:grid-cols-3 gap-10">
//             <div className="flex flex-col items-center text-center">
//               <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
//                 <VideoIcon className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-medium mb-3">AI Meeting Attendance</h3>
//               <p className="text-muted-foreground">
//                 Our bot joins meetings on your behalf and captures every detail so you never miss important information.
//               </p>
//             </div>
            
//             <div className="flex flex-col items-center text-center">
//               <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
//                 <Headphones className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-medium mb-3">Full Transcripts</h3>
//               <p className="text-muted-foreground">
//                 Get complete, searchable transcripts of your meetings with speaker identification and timestamps.
//               </p>
//             </div>
            
//             <div className="flex flex-col items-center text-center">
//               <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
//                 <MessageSquare className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-medium mb-3">AI Chat & Summaries</h3>
//               <p className="text-muted-foreground">
//                 Chat with our AI about meeting content, get summaries, and extract key action items and decisions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How it works section */}
//       <section id="how-it-works" className="py-20 px-4 bg-gray-50">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-16">How MeetMinder works</h2>
          
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="relative">
//               <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-6">
//                 <span className="font-bold">1</span>
//               </div>
//               <h3 className="text-xl font-medium mb-3">Enter meeting link</h3>
//               <p className="text-muted-foreground">
//                 Paste your meeting URL from Google Meet, Zoom, or Microsoft Teams
//               </p>
//             </div>
            
//             <div>
//               <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-6">
//                 <span className="font-bold">2</span>
//               </div>
//               <h3 className="text-xl font-medium mb-3">Bot attends for you</h3>
//               <p className="text-muted-foreground">
//                 Our AI assistant joins the meeting and records everything
//               </p>
//             </div>
            
//             <div>
//               <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-6">
//                 <span className="font-bold">3</span>
//               </div>
//               <h3 className="text-xl font-medium mb-3">View transcript</h3>
//               <p className="text-muted-foreground">
//                 Access the full transcript with speaker identification
//               </p>
//             </div>
            
//             <div>
//               <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-6">
//                 <span className="font-bold">4</span>
//               </div>
//               <h3 className="text-xl font-medium mb-3">Chat with AI</h3>
//               <p className="text-muted-foreground">
//                 Ask questions about the meeting and get personalized insights
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-50 border-t py-12 px-4">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div className="mb-8 md:mb-0">
//               <div className="flex items-center mb-4">
//                 <BotIcon className="h-6 w-6 text-primary mr-2" />
//                 <span className="font-bold">autoMeet</span>
//               </div>
//               <p className="text-muted-foreground max-w-xs">
//                 Your AI meeting assistant that captures, transcribes, and summarizes your meetings.
//               </p>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
//               <div>
//                 <h3 className="font-medium mb-4">Product</h3>
//                 <ul className="space-y-2">
//                   <li><a href="#features" className="text-muted-foreground hover:text-foreground">Features</a></li>
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">Roadmap</a></li>
//                 </ul>
//               </div>
              
//               <div>
//                 <h3 className="font-medium mb-4">Company</h3>
//                 <ul className="space-y-2">
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
//                 </ul>
//               </div>
              
//               <div>
//                 <h3 className="font-medium mb-4">Legal</h3>
//                 <ul className="space-y-2">
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms</a></li>
//                   <li><a href="#" className="text-muted-foreground hover:text-foreground">Security</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t mt-12 pt-8">
//             <p className="text-center text-muted-foreground text-sm">
//               © 2025 autoMeet. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { BotIcon, Headphones, MessageSquare, VideoIcon } from "lucide-react";

// const LandingPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen font-sans text-gray-800">
//       {/* Navigation */}
//       <header className="border-b bg-white shadow-sm sticky top-0 z-50">
//         <div className="container mx-auto px-6 lg:px-12">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center">
//               <BotIcon className="h-8 w-8 text-primary mr-2" />
//               <span className="text-2xl font-extrabold tracking-tight text-primary">autoMeet</span>
//             </div>
//             <div className="hidden md:flex items-center space-x-6 text-sm">
//               <Link to="#features" className="hover:text-primary transition-colors">Features</Link>
//               <Link to="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Link to="/login">
//                 <Button variant="outline">Log in</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button>Sign up</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero section */}
//       <section className="flex-1 flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-br from-blue-50 to-white">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
//             Never miss a meeting detail again
//           </h1>
//           <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
//             autoMeet sends an AI assistant to your meetings to capture everything, 
//             create transcripts, and provide intelligent summaries.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link to="/signup">
//               <Button size="lg" className="px-8 hover:scale-105 transition-transform">Get started for free</Button>
//             </Link>
//             <Link to="#how-it-works">
//               <Button size="lg" variant="outline" className="px-8 hover:scale-105 transition-transform">See how it works</Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features section */}
// <section id="features" className="py-24 px-6 bg-white">
//   <div className="container mx-auto">
//     <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
//       Powerful features to enhance your meetings
//     </h2>
//     <div className="flex flex-wrap justify-center gap-8">
//       {[
//         {
//           icon: <VideoIcon className="h-8 w-8 text-primary" />,
//           title: "AI Meeting Attendance",
//           description: "Our bot joins meetings on your behalf and captures every detail so you never miss important information."
//         },
//         {
//           icon: <Headphones className="h-8 w-8 text-primary" />,
//           title: "Full Transcripts",
//           description: "Get complete, searchable transcripts of your meetings with speaker identification and timestamps."
//         },
//         // Add more features if needed
//       ].map((feature, index) => (
//         <div
//           key={index}
//           className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow w-full sm:w-[300px]"
//         >
//           <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
//             {feature.icon}
//           </div>
//           <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//           <p className="text-muted-foreground">{feature.description}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


//       {/* How it works section */}
//       <section id="how-it-works" className="py-24 px-6 bg-gray-50">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">How autoMeet works</h2>
//           <div className="grid md:grid-cols-4 gap-10 text-center">
//             {[
//               { step: "1", title: "Enter meeting link", text: "Paste your meeting URL from Google Meet, Zoom, or Microsoft Teams" },
//               { step: "2", title: "Bot attends for you", text: "Our AI assistant joins the meeting and records everything" },
//               { step: "3", title: "View transcript", text: "Access the full transcript with speaker identification" },
//               { step: "4", title: "Chat with AI", text: "Ask questions about the meeting and get personalized insights" }
//             ].map((item, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                 <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
//                   {item.step}
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//                 <p className="text-sm text-muted-foreground">{item.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white border-t py-12 px-6">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div className="mb-8 md:mb-0">
//               <div className="flex items-center mb-4">
//                 <BotIcon className="h-6 w-6 text-primary mr-2" />
//                 <span className="font-bold text-lg text-gray-900">autoMeet</span>
//               </div>
//               <p className="text-muted-foreground max-w-sm">
//                 Your AI meeting assistant that captures, transcribes, and summarizes your meetings.
//               </p>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
//               {[
//                 {
//                   title: "Product",
//                   links: ["Features", "Roadmap"]
//                 },
//                 {
//                   title: "Company",
//                   links: ["About", "Blog", "Careers"]
//                 },
//                 {
//                   title: "Legal",
//                   links: ["Privacy", "Terms", "Security"]
//                 }
//               ].map((section, index) => (
//                 <div key={index}>
//                   <h3 className="font-medium mb-4 text-gray-800">{section.title}</h3>
//                   <ul className="space-y-2">
//                     {section.links.map((link, i) => (
//                       <li key={i}>
//                         <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="border-t mt-12 pt-8">
//             <p className="text-center text-muted-foreground text-sm">
//               © 2025 autoMeet. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BotIcon, Headphones, MessageSquare, VideoIcon } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {/* Navigation */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <BotIcon className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold tracking-tight text-blue-600">autoMeet</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <Link to="#features" className="hover:text-blue-600 transition-colors">Features</Link>
              <Link to="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link to="/login"><Button variant="outline">Log In</Button></Link>
              <Link to="/signup"><Button className="px-8 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-transform">Get Started</Button></Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-br from-blue-100 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4l md:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Let AI Take Notes While You Lead the Conversation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            autoMeet sends your smart assistant to every virtual meeting — it listens, records, transcribes, and summarizes, so you can stay focused and present.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup"><Button size="lg" className="px-8 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-transform">Start Free Trial</Button></Link>
            <Link to="#how-it-works"><Button size="lg" variant="outline" className="px-8 hover:scale-105 transition-transform">Explore Features</Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Unlock Smart Collaboration</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                icon: <VideoIcon className="h-8 w-8 text-blue-600" />,
                title: "Smart Attendance",
                description: "Send autoMeet into any video call — it joins like a real attendee and records everything, reliably."
              },
              {
                icon: <Headphones className="h-8 w-8 text-blue-600" />,
                title: "Live Transcripts",
                description: "Get accurate, speaker-labeled transcripts you can search, share, and refer back to anytime."
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
                title: "Actionable Summaries",
                description: "Instantly receive meeting recaps with decisions, action items, and insights — no more manual notes."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow w-full sm:w-[300px]"
              >
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">How autoMeet Works</h2>
          <div className="grid md:grid-cols-4 gap-10 text-center">
            {[
              { step: "1", title: "Paste the Link", text: "Drop in a Google Meet, Zoom, or Teams invite. autoMeet joins like magic." },
              { step: "2", title: "Bot Joins & Listens", text: "Your AI assistant enters silently, records the conversation, and observes." },
              { step: "3", title: "Instant Transcript", text: "Get detailed transcripts right after the meeting ends — labeled and searchable." },
              { step: "4", title: "AI Summary & Chat", text: "Ask autoMeet anything: 'What did Sarah say about the budget?' and get quick insights." }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <BotIcon className="h-6 w-6 text-blue-600 mr-2" />
                <span className="font-bold text-lg text-gray-900">autoMeet</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Your AI-powered meeting buddy that captures, transcribes, and delivers powerful summaries while you stay in the moment.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              {[
                { title: "Product", links: ["Features", "Integrations"] },
                { title: "Company", links: ["About", "Blog", "Careers"] },
                { title: "Legal", links: ["Privacy", "Terms", "Security"] }
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-4 text-gray-800">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t mt-12 pt-8">
            <p className="text-center text-muted-foreground text-sm">
              © 2025 autoMeet — Your smart meeting sidekick.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

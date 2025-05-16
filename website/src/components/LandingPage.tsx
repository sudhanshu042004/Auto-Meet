// export default LandingPage;
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BotIcon, Headphones, MessageSquare, VideoIcon } from "lucide-react";
import Header from "./ui/Header";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {/* Navigation */}
      <Header/>

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

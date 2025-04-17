import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  BotIcon,
  LayoutDashboard,
  Video,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, href, isActive }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300",
      isActive
        ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium shadow-lg"
        : "text-gray-500 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-500 hover:text-white"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} className="text-blue-600" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Video size={20} className="text-blue-600" />,
      label: "Meetings",
      href: "/dashboard/meetings",
    },
    {
      icon: <FileText size={20} className="text-blue-600" />,
      label: "Transcripts",
      href: "/dashboard/transcripts",
    },
    {
      icon: <Settings size={20} className="text-blue-600" />,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  const renderSidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-4 py-3">
        <BotIcon className="text-blue-600 h-7 w-7" />
        <span className="font-bold text-lg text-blue-600">autoMeet</span>
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={closeSidebar}
            className="ml-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-lg shadow-md"
          >
            <X size={20} />
          </Button>
        )}
      </div>

      <div className="px-3 mt-6 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={location.pathname === item.href}
          />
        ))}
      </div>

      <div className="mt-auto border-t pt-4 px-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md w-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar for desktop */}
      {!isMobile && (
        <div className="w-64 border-r flex flex-col h-screen sticky top-0 bg-white shadow-md">
          {renderSidebarContent()}
        </div>
      )}

      {/* Sidebar for mobile */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out flex flex-col shadow-md",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {renderSidebarContent()}
        </div>
      )}

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="border-b sticky top-0 z-30 bg-white">
          <div className="px-4 h-14 flex items-center justify-between">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu size={20} />
              </Button>
            )}

            <div className="ml-auto flex items-center gap-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

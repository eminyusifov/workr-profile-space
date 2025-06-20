
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { Link } from "react-router-dom";

interface BottomNavigationProps {
  activeTab: string;
}

const BottomNavigation = ({ activeTab }: BottomNavigationProps) => {
  const tabs = [
    { id: "main", label: "ƏSAS", icon: Home, path: "/" },
    { id: "catalog", label: "KATALOQ", icon: Search, path: "/catalog" },
    { id: "announcements", label: "ELAN", icon: Plus, path: "/announcements" },
    { id: "messages", label: "MESAJ", icon: MessageCircle, path: "/messages" },
    { id: "profile", label: "PROFİL", icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Link key={tab.id} to={tab.path}>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex flex-col items-center space-y-1 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <span className="text-xs">{tab.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;

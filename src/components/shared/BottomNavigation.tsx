
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BottomNavigationProps {
  activeTab: string;
}

const BottomNavigation = ({ activeTab }: BottomNavigationProps) => {
  const location = useLocation();
  
  const tabs = [
    { id: "main", label: "ƏSAS", icon: Home, path: "/" },
    { id: "catalog", label: "KATALOQ", icon: Search, path: "/catalog" },
    { id: "announcements", label: "ELAN", icon: Plus, path: "/announcements" },
    { id: "messages", label: "MESAJ", icon: MessageCircle, path: "/messages" },
    { id: "profile", label: "PROFİL", icon: User, path: "/profile" },
  ];

  const getActiveState = (tab) => {
    if (location.pathname === tab.path) return true;
    if (location.pathname === "/" && tab.id === "main") return true;
    return activeTab === tab.id;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = getActiveState(tab);
          
          return (
            <Link key={tab.id} to={tab.path} className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex flex-col items-center space-y-1 transition-all duration-300 relative px-4 py-3 rounded-2xl ${
                  isActive 
                    ? "text-blue-600 bg-blue-50 shadow-md scale-105" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
                
                <Icon className={`h-5 w-5 transition-all duration-300 ${
                  isActive ? "text-blue-600 scale-110" : "text-gray-400"
                }`} />
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}>
                  {tab.label}
                </span>
                
                {/* Subtle glow effect for active tab */}
                {isActive && (
                  <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-sm"></div>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;

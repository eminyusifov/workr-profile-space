
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle, Heart, Search, X } from "lucide-react";

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: MessageCircle, label: "New Message", color: "bg-blue-500 hover:bg-blue-600" },
    { icon: Heart, label: "Add to Favorites", color: "bg-red-500 hover:bg-red-600" },
    { icon: Search, label: "Quick Search", color: "bg-green-500 hover:bg-green-600" },
  ];

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* Action buttons */}
      {isExpanded && (
        <div className="flex flex-col space-y-3 mb-4">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              size="icon"
              className={`w-12 h-12 rounded-full shadow-lg ${action.color} text-white animate-fade-in hover:scale-110 transition-all duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => console.log(`${action.label} clicked`)}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
      )}
      
      {/* Main FAB */}
      <Button
        size="icon"
        className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${
          isExpanded 
            ? "bg-gray-500 hover:bg-gray-600 rotate-45" 
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        } text-white hover:scale-110`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default FloatingActionButton;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, Users, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ConversationsList from "@/components/messages/ConversationsList";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("messages");

  const conversations = [
    {
      id: 1,
      user: { name: "John Smith", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      lastMessage: "Thanks for the design!",
      timestamp: "2 min ago",
      unread: 2
    },
    {
      id: 2,
      user: { name: "Emma Wilson", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      lastMessage: "When can we start the project?",
      timestamp: "1 hour ago",
      unread: 0
    },
    {
      id: 3,
      user: { name: "Mike Johnson", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      lastMessage: "The logo looks perfect!",
      timestamp: "3 hours ago",
      unread: 1
    }
  ];

  const filteredConversations = conversations.filter(conversation =>
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                workr
              </h1>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            </div>
            <Link to="/favorites">
              <Button variant="outline" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-6 pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-4">
            <Button
              variant={activeTab === "messages" ? "default" : "outline"}
              onClick={() => setActiveTab("messages")}
              className="rounded-full"
            >
              Messages
            </Button>
            <Button
              variant={activeTab === "groups" ? "default" : "outline"}
              onClick={() => setActiveTab("groups")}
              className="rounded-full"
            >
              <Users className="h-4 w-4 mr-2" />
              Groups
            </Button>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      <ConversationsList conversations={filteredConversations} />

      <BottomNavigation activeTab="messages" />
    </div>
  );
};

export default Messages;

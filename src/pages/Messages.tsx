
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import ConversationsList from "@/components/messages/ConversationsList";
import ChatModal from "@/components/messages/ChatModal";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

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

  const handleConversationClick = (conversation) => {
    console.log("Opening conversation with:", conversation.user.name);
    setSelectedConversation(conversation);
    setIsChatModalOpen(true);
  };

  const rightContent = (
    <Link to="/favorites">
      <Button variant="outline" className="flex items-center space-x-2">
        <Heart className="h-4 w-4" />
        <span>Favorites</span>
      </Button>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <PageHeader 
        title="Messages"
        showBackButton
        rightContent={rightContent}
      />

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
              className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      <ConversationsList 
        conversations={filteredConversations} 
        onConversationClick={handleConversationClick}
      />

      <ChatModal 
        conversation={selectedConversation}
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />

      <BottomNavigation activeTab="messages" />
    </div>
  );
};

export default Messages;

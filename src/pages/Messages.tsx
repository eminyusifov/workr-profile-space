
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import ConversationsList from "@/components/messages/ConversationsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquarePlus, Search } from "lucide-react";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState(mockConversations);

  const handleNewMessage = () => {
    console.log("Creating new message");
    // TODO: Navigate to new message composer
  };

  const handleConversationClick = (conversation: any) => {
    console.log("Opening conversation:", conversation);
    // TODO: Navigate to chat view
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockConversations.filter(conversation =>
      conversation.user.name.toLowerCase().includes(query.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConversations(filtered);
  };

  const rightContent = (
    <Button variant="ghost" size="sm" onClick={handleNewMessage}>
      <MessageSquarePlus className="h-5 w-5" />
    </Button>
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader 
          title="Messages" 
          rightContent={rightContent}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          <ConversationsList 
            conversations={filteredConversations}
            onConversationClick={handleConversationClick}
          />
        </div>

        <BottomNavigation activeTab="messages" />
      </div>
    </ThemeProvider>
  );
};

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    user: { 
      name: "Sarah Johnson", 
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" 
    },
    lastMessage: "Thanks for the project proposal! I'll review it today.",
    timestamp: "2m ago",
    unread: 2
  },
  {
    id: 2,
    user: { 
      name: "Alex Chen", 
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png" 
    },
    lastMessage: "The website design looks great! When can we start?",
    timestamp: "1h ago",
    unread: 0
  },
  {
    id: 3,
    user: { 
      name: "Maria Rodriguez", 
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" 
    },
    lastMessage: "I have some questions about the branding guidelines.",
    timestamp: "3h ago",
    unread: 1
  },
  {
    id: 4,
    user: { 
      name: "David Kim", 
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png" 
    },
    lastMessage: "Project completed! Please check the final deliverables.",
    timestamp: "1d ago",
    unread: 0
  }
];

export default Messages;

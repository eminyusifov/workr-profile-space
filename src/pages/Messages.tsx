
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import ConversationsList from "@/components/messages/ConversationsList";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

const Messages = () => {
  const handleNewMessage = () => {
    console.log("Creating new message");
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
          <ConversationsList />
        </div>

        <BottomNavigation activeTab="messages" />
      </div>
    </ThemeProvider>
  );
};

export default Messages;


import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import ConversationsList from "@/components/messages/ConversationsList";
import ChatModal from "@/components/messages/ChatModal";
import MessageComposer from "@/components/messages/MessageComposer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { useSpecialists } from "@/hooks/useSpecialists";

const Messages = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showRecipientSelector, setShowRecipientSelector] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const { specialists } = useSpecialists();

  const handleConversationClick = (conversationId: number) => {
    setSelectedConversationId(conversationId);
  };

  const handleNewMessage = () => {
    setShowRecipientSelector(true);
  };

  const handleRecipientSelect = (specialist: any) => {
    setSelectedRecipient(specialist);
    setShowRecipientSelector(false);
    setShowNewMessage(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader 
          title="Messages" 
          showBackButton 
          rightContent={
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewMessage}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
            <Button 
              onClick={handleNewMessage}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span>New Message</span>
            </Button>
          </div>

          <ConversationsList onConversationClick={handleConversationClick} />
        </div>

        {/* Chat Modal */}
        {selectedConversationId && (
          <ChatModal
            isOpen={!!selectedConversationId}
            onClose={() => setSelectedConversationId(null)}
            conversationId={selectedConversationId}
          />
        )}

        {/* Recipient Selector Modal */}
        {showRecipientSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Recipient</h2>
              <div className="space-y-2">
                {specialists.map((specialist) => (
                  <button
                    key={specialist.id}
                    onClick={() => handleRecipientSelect(specialist)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={specialist.profileImage} 
                        alt={specialist.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{specialist.name}</div>
                        <div className="text-sm text-gray-500">{specialist.skills}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowRecipientSelector(false)} 
                className="w-full mt-4"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Message Composer */}
        <MessageComposer
          isOpen={showNewMessage}
          onClose={() => {
            setShowNewMessage(false);
            setSelectedRecipient(null);
          }}
          recipientName={selectedRecipient?.name}
          recipientId={selectedRecipient?.id}
        />

        <BottomNavigation activeTab="messages" />
      </div>
    </ThemeProvider>
  );
};

export default Messages;

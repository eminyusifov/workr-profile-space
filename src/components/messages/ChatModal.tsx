
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Phone, Video } from "lucide-react";
import { useState } from "react";

interface Conversation {
  id: number;
  user: { name: string; avatar: string };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface ChatModalProps {
  conversation: Conversation | null;
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal = ({ conversation, isOpen, onClose }: ChatModalProps) => {
  const [message, setMessage] = useState("");

  if (!conversation) return null;

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
      // Here you would typically send to backend
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={conversation.user.avatar} />
              <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-left">{conversation.user.name}</DialogTitle>
              <p className="text-sm text-gray-500">Online</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">{conversation.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-1">{conversation.timestamp}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                <p className="text-sm">Thank you! Looking forward to working together.</p>
                <p className="text-xs text-blue-100 mt-1">Just now</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;

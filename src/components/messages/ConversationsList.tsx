
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Conversation {
  id: number;
  user: { name: string; avatar: string };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface ConversationsListProps {
  conversations: Conversation[];
  onConversationClick?: (conversation: Conversation) => void;
}

const ConversationsList = ({ conversations, onConversationClick }: ConversationsListProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <Card 
              key={conversation.id} 
              className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md cursor-pointer"
              onClick={() => onConversationClick?.(conversation)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{conversation.user.name}</h4>
                      <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-blue-600 text-white">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversationsList;

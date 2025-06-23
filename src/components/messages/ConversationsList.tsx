
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Conversation {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface ConversationsListProps {
  conversations: Conversation[];
  onConversationClick: (conversation: Conversation) => void;
}

const ConversationsList = ({ conversations, onConversationClick }: ConversationsListProps) => {
  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <Card 
          key={conversation.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onConversationClick(conversation)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={conversation.user.avatar} />
                <AvatarFallback>
                  {conversation.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {conversation.user.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {conversation.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <Badge className="bg-blue-500 text-white text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConversationsList;

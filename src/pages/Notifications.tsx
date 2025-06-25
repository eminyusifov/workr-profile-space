
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquare, Heart, Calendar, CheckCircle } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New Message",
      description: "Sarah Johnson sent you a message about the project",
      time: "5 minutes ago",
      unread: true,
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
    },
    {
      id: 2,
      type: "favorite",
      title: "New Favorite",
      description: "Alex Chen added your profile to favorites",
      time: "1 hour ago",
      unread: true,
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png"
    },
    {
      id: 3,
      type: "booking",
      title: "Meeting Scheduled",
      description: "Project discussion meeting scheduled for tomorrow",
      time: "3 hours ago",
      unread: false,
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
    },
    {
      id: 4,
      type: "completed",
      title: "Project Completed",
      description: "Logo design project has been marked as completed",
      time: "1 day ago",
      unread: false,
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "favorite":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "booking":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Notifications" showBackButton />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`cursor-pointer hover:shadow-md transition-shadow ${notification.unread ? 'bg-blue-50/50 border-blue-200' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>N</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {getIcon(notification.type)}
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        {notification.unread && (
                          <Badge className="bg-blue-500 text-white text-xs">New</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {notification.description}
                      </p>
                      
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <BottomNavigation activeTab="profile" />
      </div>
    </ThemeProvider>
  );
};

export default Notifications;

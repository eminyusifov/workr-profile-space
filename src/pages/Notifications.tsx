
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageCircle, Heart, Star, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  type: 'message' | 'favorite' | 'review' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah Chen',
      description: 'Hi! I\'d like to discuss your design services for my startup...',
      time: '2 hours ago',
      read: false,
      avatar: '/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png'
    },
    {
      id: 2,
      type: 'favorite',
      title: 'Added to favorites',
      description: 'Alex Rodriguez added you to their favorites',
      time: '5 hours ago',
      read: false,
      avatar: '/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png'
    },
    {
      id: 3,
      type: 'review',
      title: 'New review received',
      description: 'Maya Patel left you a 5-star review for your recent project',
      time: '1 day ago',
      read: true,
      avatar: '/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png'
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile view milestone',
      description: 'Congratulations! Your profile has reached 1,000 views',
      time: '2 days ago',
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'favorite':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
      duration: 2000,
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Notifications" showBackButton />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Bell className="h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">No notifications yet</h3>
                  <p className="text-gray-600 dark:text-gray-300">We'll notify you when something interesting happens</p>
                </div>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card key={notification.id} className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'bg-blue-50/50 border-blue-200' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-sm font-medium ${
                              !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {notification.title}
                              {!notification.read && (
                                <Badge variant="secondary" className="ml-2 text-xs bg-blue-100 text-blue-700">
                                  New
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-7 px-2"
                              >
                                Mark as read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <BottomNavigation activeTab="notifications" />
      </div>
    </ThemeProvider>
  );
};

export default Notifications;

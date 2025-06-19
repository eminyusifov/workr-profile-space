
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Heart, Users, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("messages");

  const reels = [
    {
      id: 1,
      user: { name: "Sarah Chen", username: "@sarahchen", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "Logo Design Process"
    },
    {
      id: 2,
      user: { name: "Alex Rodriguez", username: "@alexdesigns", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "UI Animation"
    },
    {
      id: 3,
      user: { name: "Maya Patel", username: "@mayacreates", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "Brand Identity"
    }
  ];

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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  workr
                </h1>
              </Link>
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

      {/* Reels Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Work</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {reels.map((reel) => (
              <div key={reel.id} className="flex-shrink-0 w-24">
                <div className="relative mb-2">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-white p-1">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center relative overflow-hidden">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/specialist/${reel.user.username.slice(1)}`}>
                  <p className="text-xs text-center text-gray-700 font-medium truncate">
                    {reel.user.name.split(' ')[0]}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-6">
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

      {/* Conversations */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <Card key={conversation.id} className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md cursor-pointer">
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-xs">ƏSAS</span>
            </Button>
          </Link>
          <Link to="/catalog">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-6 h-1 bg-gray-300 rounded" />
              <span className="text-xs">KATALOQ</span>
            </Button>
          </Link>
          <Link to="/announcements">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 rounded" />
              <span className="text-xs">ELAN</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-blue-600">
            <div className="w-4 h-4 bg-blue-600 rounded" />
            <span className="text-xs">MESAJ</span>
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
              <span className="text-xs">PROFİL</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Messages;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FilterSection from "@/components/catalog/FilterSection";
import ReelsSection from "@/components/messages/ReelsSection";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Catalog = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [filters, setFilters] = useState({});

  // Mock reels data
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

  // Mock specialists data
  const specialists = [
    {
      id: 1,
      name: "S. Atayev",
      username: "@s.atayev",
      rating: 4.9,
      reviews: 67,
      category: "UX/UI Design",
      price: "800$ +",
      status: "Free",
      workStatus: "Freelance",
      languages: ["AZ", "EN", "RU"],
      tools: ["Figma", "Sketch"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 45,
      responseTime: "2 hours"
    },
    {
      id: 2,
      name: "Sarah Chen",
      username: "@sarahchen",
      rating: 4.8,
      reviews: 89,
      category: "Graphic Design",
      price: "600$ +",
      status: "Busy",
      workStatus: "Working",
      languages: ["EN", "RU"],
      tools: ["Photoshop", "Illustrator"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 78,
      responseTime: "4 hours"
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      username: "@alexdesigns",
      rating: 4.7,
      reviews: 123,
      category: "Web Development",
      price: "1200$ +",
      status: "Free",
      workStatus: "Freelance",
      languages: ["EN", "AZ"],
      tools: ["React", "Vue"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 92,
      responseTime: "1 hour"
    }
  ];

  const sortedSpecialists = showLeaderboard 
    ? [...specialists].sort((a, b) => b.rating - a.rating)
    : specialists;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                workr
              </h1>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-semibold text-gray-900">
                {showLeaderboard ? "Leaderboard" : "Catalog"}
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* Reels Section */}
      <ReelsSection reels={reels} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterSection 
          onFiltersChange={setFilters}
          showLeaderboard={showLeaderboard}
          onToggleLeaderboard={() => setShowLeaderboard(!showLeaderboard)}
        />

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSpecialists.map((specialist, index) => (
            <Card key={specialist.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                {showLeaderboard && (
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-lg font-bold">
                      #{index + 1}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{specialist.rating}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4 mb-4">
                  <Link to={`/specialist/${specialist.id}`}>
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={specialist.avatar} />
                      <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <Link to={`/specialist/${specialist.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {specialist.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm">{specialist.username}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(specialist.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {specialist.rating} ({specialist.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-3 h-3 rounded-full ${
                      specialist.status === "Free" ? "bg-green-500" : "bg-yellow-500"
                    }`} />
                    <span className="text-sm text-gray-600">{specialist.status}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Badge variant="outline">{specialist.category}</Badge>
                    <Badge variant="secondary" className="ml-2">{specialist.workStatus}</Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Languages:</p>
                    <div className="flex space-x-1">
                      {specialist.languages.map(lang => (
                        <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tools:</p>
                    <div className="flex flex-wrap gap-1">
                      {specialist.tools.map(tool => (
                        <Badge key={tool} variant="outline" className="text-xs">{tool}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{specialist.completedProjects} projects</span>
                    <span>Response: {specialist.responseTime}</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold text-gray-900">{specialist.price}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Link to={`/specialist/${specialist.id}`}>
                        <Button size="sm">View Profile</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation activeTab="catalog" />
    </div>
  );
};

export default Catalog;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, Search, ChevronLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("specialists");

  const favoriteSpecialists = [
    {
      id: 1,
      name: "Tahmina Mustafayeva",
      username: "@tahmina.m",
      skills: "UX/UI, SMM",
      rating: 4.8,
      reviews: 127,
      status: "Free",
      price: "800$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      addedDate: "2 days ago"
    },
    {
      id: 2,
      name: "Seadet Sherifova",
      username: "@seadet.s",
      skills: "Graphic, SMM",
      rating: 4.9,
      reviews: 156,
      status: "Free",
      price: "600$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      addedDate: "1 week ago"
    }
  ];

  const favoriteWorks = [
    {
      id: 1,
      title: "Brand Identity Design",
      specialist: "Sarah Chen",
      category: "Branding",
      image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      likes: 124
    },
    {
      id: 2,
      title: "Mobile App UI",
      specialist: "Alex Rodriguez",
      category: "UX/UI",
      image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      likes: 89
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/messages">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Favorites</h1>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-4 mb-6">
            <Button
              variant={activeTab === "specialists" ? "default" : "outline"}
              onClick={() => setActiveTab("specialists")}
              className="rounded-full"
            >
              Specialists
            </Button>
            <Button
              variant={activeTab === "works" ? "default" : "outline"}
              onClick={() => setActiveTab("works")}
              className="rounded-full"
            >
              Works
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeTab === "specialists" && (
            <div className="space-y-4">
              {favoriteSpecialists.map((specialist) => (
                <Card key={specialist.id} className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={specialist.avatar} />
                          <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Link to={`/specialist/${specialist.id}`}>
                            <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                              {specialist.name}
                            </h4>
                          </Link>
                          <p className="text-sm text-gray-500">{specialist.username}</p>
                          <p className="text-sm text-gray-600">{specialist.skills}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>Added {specialist.addedDate}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                        <span>{specialist.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "works" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteWorks.map((work) => (
                <Card key={work.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center relative">
                      <div className="text-white text-center p-4">
                        <div className="text-sm opacity-90 mb-2">{work.category.toUpperCase()}</div>
                        <div className="text-lg font-bold">WORK</div>
                        <div className="text-xs opacity-75 mt-2">{work.title}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white hover:text-red-400"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-1">{work.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {work.specialist}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{work.category}</Badge>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{work.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;

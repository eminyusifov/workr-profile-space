
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Graphic", "UX/UI", "Photo", "SMM", "Animation"];
  
  const specialists = [
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
      isNew: true,
      languages: "AZ - 5, RU - 4, EN - 4.5"
    },
    {
      id: 2,
      name: "Ruslan Mustafayev",
      username: "@ruslan.m",
      skills: "UX/UI, Graphic",
      rating: 4.6,
      reviews: 98,
      status: "Busy",
      price: "1200$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: true,
      languages: "AZ - 5, RU - 4, EN - 4"
    },
    {
      id: 3,
      name: "Seadet Sherifova",
      username: "@seadet.s",
      skills: "Graphic, SMM",
      rating: 4.9,
      reviews: 156,
      status: "Free",
      price: "600$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: false,
      languages: "AZ - 5, RU - 5, EN - 3"
    }
  ];

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           specialist.skills.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                workr
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Find the Perfect <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative</span> Professional
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with talented specialists across design, development, and digital marketing. Build your dream team today.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for specialists, skills, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 px-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    : "border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Artists <span className="text-blue-600">({filteredSpecialists.length})</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecialists.map((specialist) => (
              <Link key={specialist.id} to={`/specialist/${specialist.id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={specialist.avatar} />
                          <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {specialist.name}
                          </h4>
                          <p className="text-sm text-gray-500">{specialist.username}</p>
                        </div>
                      </div>
                      {specialist.isNew && (
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                          new!
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Skills</p>
                        <p className="text-sm font-medium text-gray-900">{specialist.skills}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(specialist.rating)
                                  ? "fill-blue-500 text-blue-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm font-medium ml-1">
                            ({specialist.reviews})
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            specialist.status === "Free" ? "bg-green-500" : "bg-yellow-500"
                          }`} />
                          <span className="text-sm text-gray-600">{specialist.status}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1 hover:bg-red-50 hover:text-red-600">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600">From <span className="font-semibold text-gray-900">{specialist.price}</span></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-blue-600">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-xs">ƏSAS</span>
          </Button>
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
          <Link to="/messages">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-xs">MESAJ</span>
            </Button>
          </Link>
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

export default Index;

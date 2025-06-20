
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ChevronLeft, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import FilterSection from "@/components/catalog/FilterSection";
import ReelsSection from "@/components/messages/ReelsSection";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Catalog = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [filters, setFilters] = useState({});
  const [favoriteSuppliers, setFavoriteSuppliers] = useState<number[]>([]);

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

  // Mock suppliers data - enhanced for customer perspective
  const suppliers = [
    {
      id: 1,
      name: "S. Atayev",
      username: "@s.atayev",
      rating: 4.9,
      reviews: 67,
      category: "UX/UI Design",
      price: "800$ +",
      status: "Available",
      workStatus: "Freelance",
      languages: ["AZ", "EN", "RU"],
      tools: ["Figma", "Sketch"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 45,
      responseTime: "2 hours",
      description: "Expert in creating modern UX/UI designs for web and mobile applications",
      verified: true
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
      responseTime: "4 hours",
      description: "Creative graphic designer specializing in branding and print design",
      verified: true
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      username: "@alexdesigns",
      rating: 4.7,
      reviews: 123,
      category: "Web Development",
      price: "1200$ +",
      status: "Available",
      workStatus: "Freelance",
      languages: ["EN", "AZ"],
      tools: ["React", "Vue"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 92,
      responseTime: "1 hour",
      description: "Full-stack developer building modern web applications",
      verified: false
    }
  ];

  const sortedSuppliers = showLeaderboard 
    ? [...suppliers].sort((a, b) => b.rating - a.rating)
    : suppliers;

  const toggleFavorite = (supplierId: number) => {
    setFavoriteSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

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
                {showLeaderboard ? "Top Suppliers" : "Find Suppliers"}
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

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {sortedSuppliers.length} suppliers found
            {showLeaderboard && " • Sorted by rating"}
          </p>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSuppliers.map((supplier, index) => (
            <Card key={supplier.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                {showLeaderboard && (
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-lg font-bold">
                      #{index + 1}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{supplier.rating}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4 mb-4">
                  <Link to={`/specialist/${supplier.id}`}>
                    <Avatar className="h-16 w-16 ring-2 ring-white shadow-lg">
                      <AvatarImage src={supplier.avatar} />
                      <AvatarFallback>{supplier.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <Link to={`/specialist/${supplier.id}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {supplier.name}
                        </h3>
                        {supplier.verified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">{supplier.username}</p>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">{supplier.description}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(supplier.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {supplier.rating} ({supplier.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-3 h-3 rounded-full ${
                      supplier.status === "Available" ? "bg-green-500" : "bg-yellow-500"
                    }`} />
                    <span className="text-xs text-gray-600">{supplier.status}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{supplier.category}</Badge>
                    <Badge variant="secondary" className="text-xs">{supplier.workStatus}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">{supplier.completedProjects}</span> projects
                    </div>
                    <div>
                      <span className="font-medium">{supplier.responseTime}</span> response
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Languages:</p>
                    <div className="flex space-x-1">
                      {supplier.languages.map(lang => (
                        <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tools:</p>
                    <div className="flex flex-wrap gap-1">
                      {supplier.tools.map(tool => (
                        <Badge key={tool} variant="outline" className="text-xs">{tool}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold text-gray-900">{supplier.price}</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleFavorite(supplier.id)}
                        className={favoriteSuppliers.includes(supplier.id) ? "text-red-500 border-red-200" : ""}
                      >
                        <Heart className={`h-4 w-4 ${favoriteSuppliers.includes(supplier.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Link to={`/specialist/${supplier.id}`}>
                        <Button size="sm" className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Suppliers
          </Button>
        </div>
      </div>

      <BottomNavigation activeTab="catalog" />
    </div>
  );
};

export default Catalog;

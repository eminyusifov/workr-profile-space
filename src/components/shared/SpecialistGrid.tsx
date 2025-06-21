
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Specialist {
  id: number;
  name: string;
  username: string;
  skills: string;
  rating: number;
  reviews: number;
  status: string;
  price: string;
  avatar: string;
  isNew?: boolean;
  languages?: string;
}

interface SpecialistGridProps {
  specialists: Specialist[];
  title?: string;
  showCount?: boolean;
  className?: string;
}

const SpecialistGrid = ({ specialists, title = "Specialists", showCount = true, className = "" }: SpecialistGridProps) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setFavoriteIds(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <section className={`px-4 sm:px-6 lg:px-8 pb-24 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {title} {showCount && <span className="text-blue-600">({specialists.length})</span>}
            </h3>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialists.map((specialist, index) => (
            <div
              key={specialist.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <Link to={`/specialist/${specialist.id}`} className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-14 w-14 ring-2 ring-white shadow-lg group-hover:ring-blue-200 transition-all duration-300">
                        <AvatarImage src={specialist.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {specialist.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {specialist.name}
                        </h4>
                        <p className="text-sm text-gray-500">{specialist.username}</p>
                      </div>
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      {specialist.isNew && (
                        <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 animate-pulse">
                          new!
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`p-2 transition-all duration-300 ${
                          favoriteIds.includes(specialist.id) 
                            ? 'text-red-500 hover:text-red-600 bg-red-50' 
                            : 'hover:bg-red-50 hover:text-red-500'
                        }`}
                        onClick={(e) => toggleFavorite(specialist.id, e)}
                      >
                        <Heart className={`h-4 w-4 ${favoriteIds.includes(specialist.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Skills</p>
                      <p className="text-sm font-medium text-gray-900 leading-relaxed">{specialist.skills}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 transition-colors duration-200 ${
                              i < Math.floor(specialist.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1 text-gray-600">
                          ({specialist.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full shadow-sm ${
                          specialist.status === "Free" ? "bg-green-500" : "bg-yellow-500"
                        }`} />
                        <span className="text-sm text-gray-600 font-medium">{specialist.status}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Link to={`/specialist/${specialist.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hover:bg-gray-100 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Starting from</span>
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {specialist.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistGrid;

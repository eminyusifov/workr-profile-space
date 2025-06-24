
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Specialist {
  id: number;
  name: string;
  username: string;
  rating: number;
  reviews: number;
  status: string;
  skills: string;
  price: string;
  avatar: string;
}

interface SpecialistGridProps {
  specialists: Specialist[];
  title: string;
}

const SpecialistGrid = ({ specialists, title }: SpecialistGridProps) => {
  const [favoriteSpecialists, setFavoriteSpecialists] = useState<number[]>([]);
  const { toast } = useToast();

  const handleToggleFavorite = (specialistId: number) => {
    setFavoriteSpecialists(prev => 
      prev.includes(specialistId) 
        ? prev.filter(id => id !== specialistId)
        : [...prev, specialistId]
    );
    
    const isFavorited = !favoriteSpecialists.includes(specialistId);
    toast({
      title: isFavorited ? "Added to Favorites" : "Removed from Favorites",
      description: isFavorited ? "Specialist added to your favorites." : "Specialist removed from your favorites.",
    });
  };

  const handleMessageClick = (specialist: Specialist) => {
    console.log("Opening message to:", specialist.name);
    toast({
      title: "Message",
      description: `Opening chat with ${specialist.name}...`,
    });
    // Navigate to messages page or open chat modal
  };

  if (!specialists || specialists.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">No specialists found matching your criteria.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specialists.map((specialist) => (
            <Card key={specialist.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[4/5] bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src={specialist.avatar} />
                      <AvatarFallback className="text-lg font-semibold">
                        {specialist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleFavorite(specialist.id);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${favoriteSpecialists.includes(specialist.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMessageClick(specialist);
                      }}
                    >
                      <MessageCircle className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute bottom-2 left-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      specialist.status === "Free" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        specialist.status === "Free" ? "bg-green-500" : "bg-yellow-500"
                      }`} />
                      <span>{specialist.status}</span>
                    </div>
                  </div>
                </div>
                
                <Link to={`/specialist/${specialist.id}`} className="block">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {specialist.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {specialist.price}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{specialist.username}</p>
                    
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex items-center">
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
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {specialist.rating} ({specialist.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {specialist.skills.split(', ').slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistGrid;

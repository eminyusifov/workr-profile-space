
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/components/shared/FavoritesProvider";
import { useToast } from "@/hooks/use-toast";
import MessageComposer from "@/components/messages/MessageComposer";

interface Specialist {
  id: number;
  name: string;
  skills: string;
  experience: string;
  rating: number;
  reviews: number;
  price: string;
  profileImage: string;
  status: string;
}

interface SpecialistGridProps {
  specialists: Specialist[];
  title: string;
}

const SpecialistGrid = ({ specialists, title }: SpecialistGridProps) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();
  const [messageComposerOpen, setMessageComposerOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);

  const handleHeartClick = (specialist: Specialist, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorites.includes(specialist.id)) {
      removeFromFavorites(specialist.id);
      toast({
        title: "Removed from favorites",
        description: `${specialist.name} removed from your favorites.`,
      });
    } else {
      addToFavorites(specialist.id);
      toast({
        title: "Added to favorites",
        description: `${specialist.name} added to your favorites.`,
      });
    }
  };

  const handleMessageClick = (specialist: Specialist, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSpecialist(specialist);
    setMessageComposerOpen(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <Link to="/catalog">
            <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialists.map((specialist) => (
            <Link key={specialist.id} to={`/specialist/${specialist.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <Avatar className="w-16 h-16 mx-auto">
                      <AvatarImage src={specialist.profileImage} />
                      <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleHeartClick(specialist, e)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(specialist.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {specialist.name}
                    </h3>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {specialist.skills}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{specialist.rating}</span>
                      <span className="text-xs text-gray-400">({specialist.reviews})</span>
                    </div>
                    
                    {/* Price and Message on same line */}
                    <div className="flex items-center justify-between space-x-2 mt-3">
                      <Badge variant="outline" className="text-sm font-bold text-blue-600 border-blue-200">
                        {specialist.price}
                      </Badge>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 px-3"
                        onClick={(e) => handleMessageClick(specialist, e)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <MessageComposer
        isOpen={messageComposerOpen}
        onClose={() => setMessageComposerOpen(false)}
        recipientName={selectedSpecialist?.name}
        recipientId={selectedSpecialist?.id}
      />
    </section>
  );
};

export default SpecialistGrid;

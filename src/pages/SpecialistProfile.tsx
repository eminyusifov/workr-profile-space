
import { useParams, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, Heart, Bookmark, Share2 } from "lucide-react";
import { useState } from "react";
import MessageComposer from "@/components/messages/MessageComposer";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/components/shared/FavoritesProvider";

const SpecialistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isMessageComposerOpen, setIsMessageComposerOpen] = useState(false);

  // Mock specialist data - in real app, this would be fetched based on ID
  const specialist = {
    id: parseInt(id || "1"),
    name: "Sarah Johnson",
    title: "Senior UX/UI Designer",
    location: "San Francisco, CA",
    profileImage: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
    skills: "UI/UX Design, Figma, Prototyping",
    rating: 4.9,
    reviews: 127,
    hourlyRate: "$85/hour",
    availability: "Available",
    description: "Passionate UX/UI designer with 8+ years of experience creating beautiful and functional digital experiences. I specialize in user-centered design and have worked with startups and Fortune 500 companies.",
    portfolio: [
      {
        id: 1,
        title: "E-commerce Mobile App",
        image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
        category: "Mobile Design"
      },
      {
        id: 2,
        title: "SaaS Dashboard",
        image: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
        category: "Web Design"
      }
    ]
  };

  if (!specialist) {
    navigate('/catalog');
    return null;
  }

  const isFavorited = favorites.includes(specialist.id);

  const handleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(specialist.id);
      toast({
        title: "Removed from Favorites",
        description: `${specialist.name} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(specialist.id);
      toast({
        title: "Added to Favorites",
        description: `${specialist.name} has been added to your favorites.`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: specialist.name,
        text: `Check out ${specialist.name}'s profile`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard.",
      });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Specialist Profile" showBackButton />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={specialist.profileImage} />
                  <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {specialist.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                    {specialist.title}
                  </p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {specialist.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {specialist.rating} ({specialist.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {specialist.skills.split(", ").map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {specialist.hourlyRate}
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      {specialist.availability}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button onClick={() => setIsMessageComposerOpen(true)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleFavorite}
                      className={isFavorited ? "text-red-500 border-red-200" : ""}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                About
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {specialist.description}
              </p>
            </CardContent>
          </Card>

          {/* Portfolio Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialist.portfolio.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <MessageComposer
          isOpen={isMessageComposerOpen}
          onClose={() => setIsMessageComposerOpen(false)}
          recipientName={specialist.name}
          recipientId={specialist.id}
        />

        <BottomNavigation activeTab="catalog" />
      </div>
    </ThemeProvider>
  );
};

export default SpecialistProfile;

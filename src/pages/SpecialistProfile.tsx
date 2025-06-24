
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import WorkModal from "@/components/profile/WorkModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const SpecialistProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("works");
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [favoriteWorks, setFavoriteWorks] = useState<number[]>([]);
  const [userRating, setUserRating] = useState(0);

  // Mock data - in real app, this would come from API
  const specialist = {
    id: 1,
    name: "S. Atayev",
    username: "@g.smith",
    rating: 4.6,
    reviews: 56,
    status: "Free",
    skills: "SMM, Graphic design, UX/UI, Photo",
    tools: "Figma, Sketch, Photoshop",
    languages: "AZ - 5, RU - 4, EN - 4.5",
    workspace: "Freelance",
    price: "800$ +",
    avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
    portfolio: [
      { 
        id: 1, 
        title: "Book Cover Design", 
        category: "Graphic Design",
        progress: "70%", 
        likes: 124,
        description: "A modern book cover design with clean typography and engaging visuals.",
        tags: ["Design", "Typography", "Print"],
        author: {
          name: "S. Atayev",
          avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
          rating: 4.6
        }
      },
      { 
        id: 2, 
        title: "Brand Identity", 
        category: "Branding",
        progress: "70%", 
        likes: 89,
        description: "Complete brand identity package including logo, colors, and guidelines.",
        tags: ["Branding", "Logo", "Identity"],
        author: {
          name: "S. Atayev",
          avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
          rating: 4.6
        }
      },
      { 
        id: 3, 
        title: "UI Design", 
        category: "UX/UI Design",
        progress: "70%", 
        likes: 156,
        description: "Modern UI design for mobile application with intuitive user experience.",
        tags: ["UI", "Mobile", "UX"],
        author: {
          name: "S. Atayev",
          avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
          rating: 4.6
        }
      },
    ],
    schedule: [
      { date: "2024-01-15", status: "busy" },
      { date: "2024-01-16", status: "available" },
      { date: "2024-01-17", status: "busy" },
      { date: "2024-01-18", status: "available" },
      { date: "2024-01-19", status: "available" },
    ]
  };

  const handleWriteClick = () => {
    console.log("Write message clicked");
    toast({
      title: "Message",
      description: "Opening message composer...",
    });
  };

  const handleWorkClick = (work: any) => {
    setSelectedWork(work);
  };

  const handleToggleFavoriteWork = (workId: number) => {
    setFavoriteWorks(prev => 
      prev.includes(workId) 
        ? prev.filter(id => id !== workId)
        : [...prev, workId]
    );
  };

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Rating Submitted",
      description: `You rated this specialist ${rating} stars.`,
    });
  };

  const handleHeartClick = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorited ? "Specialist removed from your favorites." : "Specialist added to your favorites.",
    });
  };

  const rightContent = (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`hover:bg-red-50 hover:text-red-600 ${isFavorited ? 'text-red-600' : ''}`}
        onClick={handleHeartClick}
      >
        <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader 
          title={specialist.name}
          showBackButton
          rightContent={rightContent}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg border-0 p-8 mb-8">
            <div className="flex items-start space-x-6 mb-6">
              <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                <AvatarImage src={specialist.avatar} />
                <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{specialist.name}</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full">
                        i
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Specialist Information</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Skills</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{specialist.skills}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Tools</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{specialist.tools}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Languages</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{specialist.languages}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Workspace</h4>
                          <Badge variant="secondary">{specialist.workspace}</Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{specialist.username}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 cursor-pointer transition-colors ${
                          i < Math.floor(specialist.rating)
                            ? "fill-blue-500 text-blue-500"
                            : userRating > i
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}
                        onClick={() => handleStarClick(i + 1)}
                      />
                    ))}
                    <span className="text-sm font-medium ml-2">
                      {specialist.rating} ({specialist.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      specialist.status === "Free" ? "bg-green-500" : "bg-yellow-500"
                    }`} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{specialist.status}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white ml-4">{specialist.price}</span>
                  </div>
                  <Button onClick={handleWriteClick} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Write
                  </Button>
                </div>
              </div>
            </div>

            {/* Compact Calendar in one line */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Availability</h3>
              <div className="flex space-x-2">
                {Array.from({ length: 14 }, (_, i) => {
                  const dayNumber = i + 1;
                  const isAvailable = Math.random() > 0.3;
                  return (
                    <div
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-lg transition-colors ${
                        isAvailable 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-200'
                      }`}
                    >
                      {dayNumber}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Works Section Only */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Portfolio</h3>
              
              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="default" className="bg-gray-600 text-white hover:bg-gray-700">All</Badge>
                <Badge variant="outline">SMM</Badge>
                <Badge variant="outline">Graphic</Badge>
                <Badge variant="outline">UX/UI</Badge>
                <Badge variant="outline">Photo</Badge>
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialist.portfolio.map((work) => (
                  <Card key={work.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative" onClick={() => handleWorkClick(work)}>
                        <div className="aspect-[4/5] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                          <div className="text-white text-center p-4">
                            <div className="text-sm opacity-90 mb-2">PORTFOLIO</div>
                            <div className="text-lg font-bold">{work.title}</div>
                            <div className="text-xs opacity-75 mt-2">Design Project</div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                          {work.progress} complete
                        </div>
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavoriteWork(work.id);
                            }}
                          >
                            <Heart className={`h-4 w-4 ${favoriteWorks.includes(work.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">{work.title}</h4>
                        <div className="flex items-center justify-between mt-2">
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
            </div>
          </div>
        </div>

        {selectedWork && (
          <WorkModal
            isOpen={!!selectedWork}
            onClose={() => setSelectedWork(null)}
            work={selectedWork}
          />
        )}

        <BottomNavigation activeTab="catalog" />
      </div>
    </ThemeProvider>
  );
};

export default SpecialistProfile;

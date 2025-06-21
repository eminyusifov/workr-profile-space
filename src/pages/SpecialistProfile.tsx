
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";

const SpecialistProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [isFavorited, setIsFavorited] = useState(false);

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
      { id: 1, image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png", title: "Book Cover Design", progress: "70%" },
      { id: 2, image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png", title: "Brand Identity", progress: "70%" },
      { id: 3, image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png", title: "UI Design", progress: "70%" },
    ]
  };

  const rightContent = (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`hover:bg-red-50 hover:text-red-600 ${isFavorited ? 'text-red-600' : ''}`}
      onClick={() => setIsFavorited(!isFavorited)}
    >
      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <PageHeader 
        title={specialist.name}
        showBackButton
        rightContent={rightContent}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border-0 p-8 mb-8">
          <div className="flex items-start space-x-6 mb-6">
            <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
              <AvatarImage src={specialist.avatar} />
              <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{specialist.name}</h2>
              <p className="text-gray-600 mb-4">{specialist.username}</p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(specialist.rating)
                          ? "fill-blue-500 text-blue-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-2">
                    {specialist.rating} ({specialist.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  specialist.status === "Free" ? "bg-green-500" : "bg-yellow-500"
                }`} />
                <span className="text-sm text-gray-600">{specialist.status}</span>
                <span className="text-lg font-bold text-gray-900 ml-4">{specialist.price}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="info" className="text-sm font-medium">Info</TabsTrigger>
              <TabsTrigger value="works" className="text-sm font-medium">Works</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {specialist.skills.split(', ').map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {specialist.tools.split(', ').map((tool) => (
                    <Badge key={tool} variant="outline">{tool}</Badge>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                <p className="text-gray-700">{specialist.languages}</p>
              </div>

              {/* Workspace */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Workspace</h3>
                <Badge variant="secondary">{specialist.workspace}</Badge>
              </div>
            </TabsContent>

            <TabsContent value="works" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio</h3>
                
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
                    <Card key={work.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
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
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900">{work.title}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNavigation activeTab="catalog" />
    </div>
  );
};

export default SpecialistProfile;

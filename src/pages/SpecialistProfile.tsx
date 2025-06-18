
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, ChevronLeft, Settings } from "lucide-react";

const SpecialistProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">{specialist.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border-0 p-8 mb-8">
          <div className="flex items-start space-x-6 mb-6">
            <Avatar className="h-20 w-20">
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
                    Rating: {specialist.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="info" className="text-sm font-medium">Info</TabsTrigger>
              <TabsTrigger value="works" className="text-sm font-medium">Works</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-700">{specialist.status}</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Rate ({specialist.rating})</h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(specialist.rating)
                          ? "fill-blue-500 text-blue-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                <p className="text-gray-700">{specialist.skills}</p>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tools</h3>
                <p className="text-gray-700">{specialist.tools}</p>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Language</h3>
                <p className="text-gray-700">{specialist.languages}</p>
              </div>

              {/* Workspace */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Workspace</h3>
                <p className="text-gray-700">{specialist.workspace}</p>
              </div>

              {/* Money */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Money</h3>
                <p className="text-gray-700 font-semibold">{specialist.price}</p>
              </div>
            </TabsContent>

            <TabsContent value="works" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Works</h3>
                
                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-gray-600 text-white hover:bg-gray-700">SMM</Badge>
                  <Badge variant="outline">Graphic</Badge>
                  <Badge variant="outline">UX/UI</Badge>
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
                              <div className="text-sm opacity-90 mb-2">BOOK COVER</div>
                              <div className="text-lg font-bold">SAMPLE</div>
                              <div className="text-xs opacity-75 mt-2">Design Project</div>
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                            {work.progress}
                          </div>
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <span className="text-xs">ƏSAS</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
            <div className="w-6 h-1 bg-gray-300 rounded" />
            <span className="text-xs">KATALOQ</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
            <span className="text-xs">ELAN</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <span className="text-xs">BLAQQ</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <span className="text-xs">PROFİL</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default SpecialistProfile;

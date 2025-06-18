
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Edit, Share, Heart, Eye, MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const user = {
    name: "John Smith",
    username: "@johnsmith",
    email: "john@example.com",
    bio: "Creative designer with 5+ years of experience in UX/UI design and branding. Passionate about creating meaningful digital experiences.",
    avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
    coverImage: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
    isSpecialist: true,
    verified: true,
    joinedDate: "January 2023",
    stats: {
      profileViews: 1245,
      favorites: 89,
      projects: 24,
      rating: 4.9,
      reviews: 67
    },
    skills: ["UX/UI Design", "Branding", "Figma", "Adobe Creative Suite"],
    portfolio: [
      { id: 1, title: "E-commerce App Design", category: "UX/UI", likes: 45 },
      { id: 2, title: "Brand Identity Package", category: "Branding", likes: 32 },
      { id: 3, title: "Website Redesign", category: "Web Design", likes: 28 }
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  workr
                </h1>
              </Link>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border-0 p-8 mb-8">
          {/* Cover Image */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 -mt-12 relative z-10">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                {user.verified && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mb-2">{user.username}</p>
              <p className="text-gray-700 mb-4">{user.bio}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{user.stats.profileViews}</span>
                  <span className="text-gray-500">views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{user.stats.favorites}</span>
                  <span className="text-gray-500">favorites</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{user.stats.rating}</span>
                  <span className="text-gray-500">({user.stats.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">My Work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.portfolio.map((work) => (
                  <Card key={work.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                        <div className="text-white text-center p-4">
                          <div className="text-sm opacity-90 mb-2">{work.category.toUpperCase()}</div>
                          <div className="text-lg font-bold">PROJECT</div>
                          <div className="text-xs opacity-75 mt-2">{work.title}</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{work.title}</h4>
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
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <Card className="bg-white/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">Your portfolio received 12 new likes</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">New message from Sarah Chen</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-4">
                <Card className="bg-white/50">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-gray-900 mb-2">Profile Information</h4>
                    <p className="text-sm text-gray-600 mb-4">Update your account details and preferences.</p>
                    <Button variant="outline">Edit Profile</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/50">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-gray-900 mb-2">Privacy Settings</h4>
                    <p className="text-sm text-gray-600 mb-4">Control who can see your profile and portfolio.</p>
                    <Button variant="outline">Manage Privacy</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/50">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-gray-900 mb-2">Notifications</h4>
                    <p className="text-sm text-gray-600 mb-4">Choose what notifications you want to receive.</p>
                    <Button variant="outline">Configure</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-xs">ƏSAS</span>
            </Button>
          </Link>
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
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-xs">BLAQQ</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-blue-600">
            <div className="w-4 h-4 bg-blue-600 rounded-full" />
            <span className="text-xs">PROFİL</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Profile;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Share, ChevronLeft, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PortfolioTab from "@/components/profile/PortfolioTab";
import ActivityTab from "@/components/profile/ActivityTab";
import SettingsTab from "@/components/profile/SettingsTab";
import EditProfileModal from "@/components/profile/EditProfileModal";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
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

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    setIsEditModalOpen(true);
  };

  const handleShareProfile = () => {
    console.log("Share profile clicked");
    navigator.share?.({
      title: `${user.name} - workr Profile`,
      text: user.bio,
      url: window.location.href
    }) || alert("Profile link copied to clipboard!");
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                workr
              </h1>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleShareProfile}>
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleEditProfile}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={user} />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <PortfolioTab portfolio={user.portfolio} />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <ActivityTab />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />

      <BottomNavigation activeTab="profile" />
    </div>
  );
};

export default Profile;


import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioTab from "@/components/profile/PortfolioTab";
import ActivityTab from "@/components/profile/ActivityTab";
import SettingsTab from "@/components/profile/SettingsTab";
import { useToast } from "@/hooks/use-toast";
import { useUserType } from "@/contexts/UserTypeContext";

const Profile = () => {
  const { toast } = useToast();
  const { isContractor } = useUserType();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleShareProfile = () => {
    console.log("Share profile clicked");
    if (navigator.share && window.location.protocol === 'https:') {
      navigator.share({
        title: mockUser.name,
        text: `Check out ${mockUser.name}'s profile`,
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing:', error);
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Profile link copied to clipboard.",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard.",
      });
    }
  };

  const handleManagePrivacy = () => {
    console.log("Manage privacy clicked");
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy settings have been configured successfully.",
    });
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Profile" showBackButton />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileHeader 
            user={mockUser}
            isOwnProfile={true}
            onEditProfile={handleEditProfile}
            onShareProfile={handleShareProfile}
          />
          
          <Tabs defaultValue={isContractor ? "portfolio" : "activity"} className="mt-8">
            <TabsList className={`grid w-full ${isContractor ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {isContractor && <TabsTrigger value="portfolio">Portfolio</TabsTrigger>}
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {isContractor && (
              <TabsContent value="portfolio" className="mt-6">
                <PortfolioTab portfolio={mockPortfolio} />
              </TabsContent>
            )}
            
            <TabsContent value="activity" className="mt-6">
              <ActivityTab />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <SettingsTab 
                onEditProfile={handleEditProfile}
                onManagePrivacy={handleManagePrivacy}
                onNotifications={handleNotifications}
              />
            </TabsContent>
          </Tabs>
        </div>

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={mockUser}
        />

        <BottomNavigation activeTab="profile" />
      </div>
    </ThemeProvider>
  );
};

// Mock user data
const mockUser = {
  name: "John Smith",
  username: "@johnsmith",
  email: "john@example.com",
  bio: "Senior UX/UI Designer with 8+ years of experience in creating beautiful and functional digital experiences. Passionate about user-centered design and modern web technologies.",
  avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
  verified: true,
  joinedDate: "March 2020",
  stats: {
    profileViews: 15420,
    favorites: 284,
    projects: 127,
    rating: 4.9,
    reviews: 156
  },
  skills: ["UI/UX Design", "Figma", "Sketch", "Prototyping", "User Research", "Wireframing", "React", "TypeScript"]
};

// Mock portfolio data
const mockPortfolio = [
  {
    id: 1,
    title: "E-commerce Mobile App",
    category: "Mobile Design",
    likes: 245,
    description: "A modern e-commerce mobile app with intuitive navigation and seamless checkout flow.",
    tags: ["Mobile", "E-commerce", "UX/UI"],
    author: {
      name: "John Smith",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      rating: 4.9
    }
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    category: "Web Design",
    likes: 189,
    description: "Clean and professional dashboard design for a project management SaaS platform.",
    tags: ["Web", "Dashboard", "SaaS"],
    author: {
      name: "John Smith", 
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      rating: 4.9
    }
  },
  {
    id: 3,
    title: "Brand Identity Design",
    category: "Branding",
    likes: 312,
    description: "Complete brand identity package including logo, colors, and typography guidelines.",
    tags: ["Branding", "Logo", "Identity"],
    author: {
      name: "John Smith",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png", 
      rating: 4.9
    }
  },
  {
    id: 4,
    title: "Landing Page Design",
    category: "Web Design",
    likes: 156,
    description: "High-converting landing page design for a tech startup with modern aesthetics.",
    tags: ["Landing Page", "Conversion", "Tech"],
    author: {
      name: "John Smith",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      rating: 4.9
    }
  }
];

export default Profile;

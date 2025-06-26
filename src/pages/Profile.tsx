import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfileModal from "@/components/profile/EditProfileModal";
import SkillsConfigModal from "@/components/profile/SkillsConfigModal";
import StatusConfigModal from "@/components/profile/StatusConfigModal";
import ToolsConfigModal from "@/components/profile/ToolsConfigModal";
import WorkspaceConfigModal from "@/components/profile/WorkspaceConfigModal";
import LanguageConfigModal from "@/components/profile/LanguageConfigModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PortfolioTab from "@/components/profile/PortfolioTab";
import ActivityTab from "@/components/profile/ActivityTab";
import SettingsTab from "@/components/profile/SettingsTab";
import { useToast } from "@/hooks/use-toast";
import { useUserType } from "@/contexts/UserTypeContext";
import { Settings, Users, Globe, Monitor, MapPin } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const { isContractor } = useUserType();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  // Modal states for contractor configuration
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Mock data states (in real app, these would come from API/database)
  const [userSkills, setUserSkills] = useState(mockUser.skills);
  const [userStatus, setUserStatus] = useState("available");
  const [userTools, setUserTools] = useState(["Figma", "Photoshop", "Sketch"]);
  const [workspacePreferences, setWorkspacePreferences] = useState({
    workArrangement: "remote",
    serviceAreas: ["National", "International"],
    timeZone: "UTC+00:00",
    workingHours: "9 AM - 5 PM"
  });
  const [userLanguages, setUserLanguages] = useState([
    { language: "English", level: "5", isPrimary: true },
    { language: "Spanish", level: "3", isPrimary: false }
  ]);

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

  // Handler functions for modal saves
  const handleSkillsSave = (skills: string[], certifications: string[]) => {
    setUserSkills(skills);
    console.log("Skills saved:", skills, "Certifications:", certifications);
  };

  const handleStatusSave = (status: string, message: string, autoUpdate: boolean, availableUntil?: Date) => {
    setUserStatus(status);
    console.log("Status saved:", { status, message, autoUpdate, availableUntil });
  };

  const handleToolsSave = (tools: string[], equipment: string[], licenses: string[]) => {
    setUserTools(tools);
    console.log("Tools saved:", { tools, equipment, licenses });
  };

  const handleWorkspaceSave = (preferences: any) => {
    setWorkspacePreferences(preferences);
    console.log("Workspace preferences saved:", preferences);
  };

  const handleLanguageSave = (languages: any[], communicationPreference: string) => {
    setUserLanguages(languages);
    console.log("Languages saved:", { languages, communicationPreference });
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

          {/* Contractor Configuration Cards */}
          {isContractor && (
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Skills Configuration */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsSkillsModalOpen(true)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Settings className="h-4 w-4 text-blue-600" />
                      <span>Skills & Expertise</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {userSkills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {userSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{userSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Status Configuration */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsStatusModalOpen(true)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${userStatus === 'available' ? 'bg-green-500' : userStatus === 'busy' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span>Availability Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm capitalize font-medium">{userStatus}</p>
                    <p className="text-xs text-gray-600">Click to update status</p>
                  </CardContent>
                </Card>

                {/* Tools Configuration */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsToolsModalOpen(true)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Monitor className="h-4 w-4 text-blue-600" />
                      <span>Tools & Software</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {userTools.slice(0, 2).map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                      {userTools.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{userTools.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Workspace Configuration */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsWorkspaceModalOpen(true)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>Workspace Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium capitalize">{workspacePreferences.workArrangement}</p>
                    <p className="text-xs text-gray-600">{workspacePreferences.timeZone}</p>
                  </CardContent>
                </Card>

                {/* Language Configuration */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsLanguageModalOpen(true)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span>Languages</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {userLanguages.slice(0, 2).map((lang) => (
                        <Badge key={lang.language} variant={lang.isPrimary ? "default" : "secondary"} className="text-xs">
                          {lang.language}
                        </Badge>
                      ))}
                      {userLanguages.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{userLanguages.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Optimization */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>Profile Optimization</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-green-600">85% Complete</p>
                    <p className="text-xs text-gray-600">Add portfolio items to improve</p>
                  </CardContent>
                </Card>

              </div>
            </div>
          )}
          
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

        {/* Modals */}
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={mockUser}
        />

        {isContractor && (
          <>
            <SkillsConfigModal
              isOpen={isSkillsModalOpen}
              onClose={() => setIsSkillsModalOpen(false)}
              currentSkills={userSkills}
              onSave={handleSkillsSave}
            />

            <StatusConfigModal
              isOpen={isStatusModalOpen}
              onClose={() => setIsStatusModalOpen(false)}
              currentStatus={userStatus}
              onSave={handleStatusSave}
            />

            <ToolsConfigModal
              isOpen={isToolsModalOpen}
              onClose={() => setIsToolsModalOpen(false)}
              currentTools={userTools}
              onSave={handleToolsSave}
            />

            <WorkspaceConfigModal
              isOpen={isWorkspaceModalOpen}
              onClose={() => setIsWorkspaceModalOpen(false)}
              currentPreferences={workspacePreferences}
              onSave={handleWorkspaceSave}
            />

            <LanguageConfigModal
              isOpen={isLanguageModalOpen}
              onClose={() => setIsLanguageModalOpen(false)}
              currentLanguages={userLanguages}
              onSave={handleLanguageSave}
            />
          </>
        )}

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


import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioTab from "@/components/profile/PortfolioTab";
import ActivityTab from "@/components/profile/ActivityTab";
import SettingsTab from "@/components/profile/SettingsTab";

const Profile = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Profile" showBackButton />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileHeader />
          
          <Tabs defaultValue="portfolio" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="mt-6">
              <PortfolioTab />
            </TabsContent>
            
            <TabsContent value="activity" className="mt-6">
              <ActivityTab />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>

        <BottomNavigation activeTab="profile" />
      </div>
    </ThemeProvider>
  );
};

export default Profile;


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioTab from "@/components/profile/PortfolioTab";
import ActivityTab from "@/components/profile/ActivityTab";
import SettingsTab from "@/components/profile/SettingsTab";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  likes: number;
  description: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    rating: number;
  };
}

interface ProfileTabsProps {
  isContractor: boolean;
  portfolio: PortfolioItem[];
  onEditProfile: () => void;
  onManagePrivacy: () => void;
  onNotifications: () => void;
}

const ProfileTabs = ({
  isContractor,
  portfolio,
  onEditProfile,
  onManagePrivacy,
  onNotifications
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue={isContractor ? "portfolio" : "activity"} className="mt-8">
      <TabsList className={`grid w-full ${isContractor ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {isContractor && <TabsTrigger value="portfolio">Portfolio</TabsTrigger>}
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      {isContractor && (
        <TabsContent value="portfolio" className="mt-6">
          <PortfolioTab portfolio={portfolio} />
        </TabsContent>
      )}
      
      <TabsContent value="activity" className="mt-6">
        <ActivityTab />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <SettingsTab 
          onEditProfile={onEditProfile}
          onManagePrivacy={onManagePrivacy}
          onNotifications={onNotifications}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;

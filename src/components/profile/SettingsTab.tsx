
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SettingsTabProps {
  onEditProfile?: () => void;
  onManagePrivacy?: () => void;
  onNotifications?: () => void;
}

const SettingsTab = ({ onEditProfile, onManagePrivacy, onNotifications }: SettingsTabProps) => {
  const { toast } = useToast();

  const handleManagePrivacy = () => {
    console.log("Managing privacy settings...");
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved successfully.",
      duration: 3000,
    });
    if (onManagePrivacy) {
      onManagePrivacy();
    }
  };

  const handleConfigureNotifications = () => {
    console.log("Configuring notifications...");
    toast({
      title: "Notification Settings Updated", 
      description: "Your notification preferences have been configured.",
      duration: 3000,
    });
    if (onNotifications) {
      onNotifications();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
      <div className="space-y-4">
        <Card className="bg-white/50">
          <CardContent className="p-6">
            <h4 className="font-medium text-gray-900 mb-2">Profile Information</h4>
            <p className="text-sm text-gray-600 mb-4">Update your account details, upload a new photo, and manage your preferences.</p>
            <Button variant="outline" onClick={onEditProfile}>Edit Profile & Photo</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50">
          <CardContent className="p-6">
            <h4 className="font-medium text-gray-900 mb-2">Privacy Settings</h4>
            <p className="text-sm text-gray-600 mb-4">Control who can see your profile and portfolio.</p>
            <Button variant="outline" onClick={handleManagePrivacy}>Manage Privacy</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50">
          <CardContent className="p-6">
            <h4 className="font-medium text-gray-900 mb-2">Notifications</h4>
            <p className="text-sm text-gray-600 mb-4">Choose what notifications you want to receive.</p>
            <Button variant="outline" onClick={handleConfigureNotifications}>Configure Notifications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTab;

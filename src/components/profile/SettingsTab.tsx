
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SettingsTabProps {
  onEditProfile?: () => void;
  onManagePrivacy?: () => void;
  onNotifications?: () => void;
}

const SettingsTab = ({ onEditProfile, onManagePrivacy, onNotifications }: SettingsTabProps) => {
  const handleManagePrivacy = () => {
    console.log("Managing privacy settings...");
    if (onManagePrivacy) {
      onManagePrivacy();
    } else {
      alert("Privacy settings functionality coming soon!");
    }
  };

  const handleConfigureNotifications = () => {
    console.log("Configuring notifications...");
    if (onNotifications) {
      onNotifications();
    } else {
      alert("Notification settings functionality coming soon!");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
      <div className="space-y-4">
        <Card className="bg-white/50">
          <CardContent className="p-6">
            <h4 className="font-medium text-gray-900 mb-2">Profile Information</h4>
            <p className="text-sm text-gray-600 mb-4">Update your account details and preferences.</p>
            <Button variant="outline" onClick={onEditProfile}>Edit Profile</Button>
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
            <Button variant="outline" onClick={handleConfigureNotifications}>Configure</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTab;

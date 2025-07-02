
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Download, 
  Trash2,
  Settings,
  Lock,
  Globe,
  Mail,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SettingsTabProps {
  onEditProfile: () => void;
  onManagePrivacy: () => void;
  onNotifications: () => void;
}

const SettingsTab = ({ onEditProfile, onManagePrivacy, onNotifications }: SettingsTabProps) => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const { toast } = useToast();

  const handleManagePrivacy = () => {
    setPrivacyModalOpen(true);
    onManagePrivacy();
  };

  const handleNotifications = () => {
    setNotificationModalOpen(true);
    onNotifications();
  };

  const handlePrivacySave = () => {
    setPrivacyModalOpen(false);
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved successfully.",
      duration: 3000,
    });
  };

  const handleNotificationSave = () => {
    setNotificationModalOpen(false);
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved successfully.",
      duration: 3000,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready shortly and sent to your email.",
      duration: 3000,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Account Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onEditProfile} variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button onClick={handleManagePrivacy} variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Manage Privacy
          </Button>
          
          <Button onClick={handleNotifications} variant="outline" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Data & Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleExportData} variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export My Data
          </Button>
          
          <Separator />
          
          <Button 
            onClick={handleDeleteAccount}
            variant="destructive" 
            className="w-full justify-start"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings Modal */}
      <Dialog open={privacyModalOpen} onOpenChange={setPrivacyModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Privacy Settings</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Make your profile visible to clients
                  </p>
                </div>
                <Switch
                  checked={profileVisible}
                  onCheckedChange={setProfileVisible}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Email Address</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Display email on your public profile
                  </p>
                </div>
                <Switch
                  checked={showEmail}
                  onCheckedChange={setShowEmail}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Phone Number</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Display phone on your public profile
                  </p>
                </div>
                <Switch
                  checked={showPhone}
                  onCheckedChange={setShowPhone}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handlePrivacySave} className="flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setPrivacyModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Settings Modal */}
      <Dialog open={notificationModalOpen} onOpenChange={setNotificationModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive updates via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive push notifications
                    </p>
                  </div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium mb-2">Notification Types</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">New Messages</Badge>
                <Badge variant="secondary">Job Matches</Badge>
                <Badge variant="secondary">Profile Views</Badge>
                <Badge variant="secondary">System Updates</Badge>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleNotificationSave} className="flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setNotificationModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsTab;

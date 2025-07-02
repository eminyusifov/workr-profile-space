
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    bio: string;
    skills: string[];
    avatar: string;
    email: string;
  };
}

const EditProfileModal = ({ isOpen, onClose, user }: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    skills: user.skills.join(", "),
    avatar: user.avatar,
    email: user.email
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData(prev => ({ ...prev, avatar: result }));
      setIsUploading(false);
      
      toast({
        title: "Photo updated",
        description: "Your profile photo has been updated.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    // Here you would typically save to a backend
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback>
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={triggerFileInput}
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={isUploading}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Change Photo</span>
            </Button>
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>
          
          <div>
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              placeholder="UX/UI Design, Figma, Adobe Creative Suite"
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Edit, Share, Heart, Eye, Star } from "lucide-react";

interface User {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  verified: boolean;
  joinedDate: string;
  stats: {
    profileViews: number;
    favorites: number;
    projects: number;
    rating: number;
    reviews: number;
  };
  skills: string[];
}

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
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
  );
};

export default ProfileHeader;

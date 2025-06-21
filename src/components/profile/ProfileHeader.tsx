
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Heart, Eye, Star, UserPlus, Share, Calendar, MapPin } from "lucide-react";

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
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onShareProfile?: () => void;
}

const ProfileHeader = ({ user, isOwnProfile = true, onEditProfile, onShareProfile }: ProfileHeaderProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-0 p-8 mb-8 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift"></div>
      
      {/* Enhanced cover image with overlay */}
      <div className="relative h-40 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-2xl mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 -mt-16 relative z-10">
        <Avatar className="h-28 w-28 border-4 border-white shadow-xl ring-4 ring-white/20">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                {user.verified && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    ✓ Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mb-2 font-medium">{user.username}</p>
              <p className="text-gray-700 mb-4 leading-relaxed max-w-2xl">{user.bio}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {user.joinedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>Remote</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {isOwnProfile ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={onEditProfile} 
                    className="flex items-center space-x-2 bg-white/80 hover:bg-white border-2 hover:border-blue-300 transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onShareProfile} 
                    className="flex items-center space-x-2 bg-white/80 hover:bg-white border-2 hover:border-blue-300 transition-all duration-300"
                  >
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={isFavorited ? "default" : "outline"}
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isFavorited 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                        : 'hover:bg-red-50 hover:text-red-600 hover:border-red-300'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                    <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
                  </Button>
                  <Button
                    variant={isFriend ? "default" : "outline"}
                    onClick={() => setIsFriend(!isFriend)}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isFriend 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                        : 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
                    }`}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>{isFriend ? 'Friends' : 'Add Friend'}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onShareProfile} 
                    className="flex items-center space-x-2 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced stats section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{user.stats.profileViews.toLocaleString()}</span>
            </div>
            <span className="text-sm text-gray-500">Profile Views</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-2xl font-bold text-gray-900">{user.stats.favorites}</span>
            </div>
            <span className="text-sm text-gray-500">Favorites</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{user.stats.rating}</span>
            </div>
            <span className="text-sm text-gray-500">Rating ({user.stats.reviews} reviews)</span>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{user.stats.projects}</div>
            <span className="text-sm text-gray-500">Projects</span>
          </div>
        </div>

        {/* Enhanced skills section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-gray-200 hover:border-blue-300 transition-all duration-300 px-3 py-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

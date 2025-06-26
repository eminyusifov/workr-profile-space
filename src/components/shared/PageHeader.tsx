import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Bell, MessageCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useFavorites } from "@/components/shared/FavoritesProvider";
import { useUserType } from "@/contexts/UserTypeContext";
import UserTypeSelector from "@/components/shared/UserTypeSelector";
import { useAuth } from "@/contexts/AuthContext";

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSettings?: boolean;
  rightContent?: React.ReactNode;
}

const PageHeader = ({ title, showBackButton = false, showSettings = false, rightContent }: PageHeaderProps) => {
  const navigate = useNavigate();
  const { favoritesCount } = useFavorites();
  const { userType, setUserType } = useUserType();
  const { user, signOut } = useAuth();
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);

  const handleAvatarClick = () => {
    setShowUserTypeSelector(true);
  };

  const handleUserTypeChange = (newUserType: 'customer' | 'contractor') => {
    setUserType(newUserType);
    setShowUserTypeSelector(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {title && (
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {showSettings && <ThemeToggle />}
            
            {/* Messages */}
            <Link to="/messages">
              <Button variant="ghost" size="sm" className="relative">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>

            {/* Notifications */}
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>

            {/* Favorites */}
            <Link to="/favorites">
              <Button variant="ghost" size="sm" className="relative">
                <span className="text-sm">❤️</span>
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white flex items-center justify-center">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Settings - only show on main page */}
            {showSettings && (
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            )}

            {/* User Avatar - clickable for user type switching */}
            {rightContent ? (
              <div onClick={handleAvatarClick} className="cursor-pointer">
                {rightContent}
              </div>
            ) : (
              <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all" onClick={handleAvatarClick}>
                <AvatarImage src="/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" />
                <AvatarFallback>
                  {user?.user_metadata?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </header>

      {/* User Type Selector Modal */}
      {showUserTypeSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Menu</h2>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Signed in as: <span className="font-medium">{user?.email}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Current mode: <span className="font-medium capitalize">{userType}</span>
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => handleUserTypeChange('customer')}
                variant={userType === 'customer' ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                <span className="mr-2">👤</span>
                Customer - Hire contractors and post jobs
              </Button>
              <Button
                onClick={() => handleUserTypeChange('contractor')}
                variant={userType === 'contractor' ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                <span className="mr-2">💼</span>
                Contractor - Showcase portfolio and find work
              </Button>
            </div>
            <div className="flex space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowUserTypeSelector(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleSignOut} className="flex-1">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeader;

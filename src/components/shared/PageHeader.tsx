
import { useState } from "react";
import { Bell, Settings, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";

interface PageHeaderProps {
  title?: string;
  showSettings?: boolean;
  showNotifications?: boolean;
  showSearch?: boolean;
  rightContent?: React.ReactNode;
  notificationCount?: number;
}

const PageHeader = ({ 
  title = "Workr", 
  showSettings = false, 
  showNotifications = true,
  showSearch = false,
  rightContent,
  notificationCount = 0
}: PageHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>

          {/* Center search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Mobile search button */}
            {showSearch && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <ThemeToggle />

            {showNotifications && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center p-0 min-w-0"
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Button>
            )}

            {showSettings && (
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            )}

            {rightContent}
          </div>
        </div>

        {/* Mobile search bar */}
        {showSearch && isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;

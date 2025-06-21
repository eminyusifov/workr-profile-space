
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  showSettings?: boolean;
  rightContent?: React.ReactNode;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  showBackButton = false, 
  showSettings = false, 
  rightContent 
}: PageHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              workr
            </h1>
            {(title || subtitle) && <span className="text-gray-400">|</span>}
            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
          </div>
          <div className="flex items-center space-x-4">
            {showSettings && (
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            )}
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;

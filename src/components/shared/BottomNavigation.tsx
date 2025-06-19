
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BottomNavigationProps {
  activeTab: string;
}

const BottomNavigation = ({ activeTab }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`w-4 h-4 ${activeTab === 'home' ? 'bg-blue-600' : 'bg-gray-300'} rounded`} />
            <span className="text-xs">ƏSAS</span>
          </Button>
        </Link>
        <Link to="/catalog">
          <Button variant="ghost" size="sm" className={`flex flex-col items-center space-y-1 ${activeTab === 'catalog' ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`w-6 h-1 ${activeTab === 'catalog' ? 'bg-blue-600' : 'bg-gray-300'} rounded`} />
            <span className="text-xs">KATALOQ</span>
          </Button>
        </Link>
        <Link to="/announcements">
          <Button variant="ghost" size="sm" className={`flex flex-col items-center space-y-1 ${activeTab === 'announcements' ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`w-4 h-4 border-2 ${activeTab === 'announcements' ? 'border-blue-600' : 'border-gray-300'} rounded`} />
            <span className="text-xs">ELAN</span>
          </Button>
        </Link>
        <Link to="/messages">
          <Button variant="ghost" size="sm" className={`flex flex-col items-center space-y-1 ${activeTab === 'messages' ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`w-4 h-4 ${activeTab === 'messages' ? 'bg-blue-600' : 'bg-gray-300'} rounded`} />
            <span className="text-xs">MESAJ</span>
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="ghost" size="sm" className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`w-4 h-4 ${activeTab === 'profile' ? 'bg-blue-600' : 'bg-gray-300'} rounded-full`} />
            <span className="text-xs">PROFİL</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FilterSection from "@/components/catalog/FilterSection";
import SuppliersGrid from "@/components/catalog/SuppliersGrid";
import ReelsSection from "@/components/messages/ReelsSection";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Catalog = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [filters, setFilters] = useState({});
  const [favoriteSuppliers, setFavoriteSuppliers] = useState<number[]>([]);

  // Mock reels data
  const reels = [
    {
      id: 1,
      user: { name: "Sarah Chen", username: "@sarahchen", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "Logo Design Process"
    },
    {
      id: 2,
      user: { name: "Alex Rodriguez", username: "@alexdesigns", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "UI Animation"
    },
    {
      id: 3,
      user: { name: "Maya Patel", username: "@mayacreates", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "Brand Identity"
    }
  ];

  // Mock suppliers data - enhanced for customer perspective
  const suppliers = [
    {
      id: 1,
      name: "S. Atayev",
      username: "@s.atayev",
      rating: 4.9,
      reviews: 67,
      category: "UX/UI Design",
      price: "800$ +",
      status: "Available",
      workStatus: "Freelance",
      languages: ["AZ", "EN", "RU"],
      tools: ["Figma", "Sketch"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 45,
      responseTime: "2 hours",
      description: "Expert in creating modern UX/UI designs for web and mobile applications",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      username: "@sarahchen",
      rating: 4.8,
      reviews: 89,
      category: "Graphic Design",
      price: "600$ +",
      status: "Busy",
      workStatus: "Working",
      languages: ["EN", "RU"],
      tools: ["Photoshop", "Illustrator"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 78,
      responseTime: "4 hours",
      description: "Creative graphic designer specializing in branding and print design",
      verified: true
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      username: "@alexdesigns",
      rating: 4.7,
      reviews: 123,
      category: "Web Development",
      price: "1200$ +",
      status: "Available",
      workStatus: "Freelance",
      languages: ["EN", "AZ"],
      tools: ["React", "Vue"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      completedProjects: 92,
      responseTime: "1 hour",
      description: "Full-stack developer building modern web applications",
      verified: false
    }
  ];

  const sortedSuppliers = showLeaderboard 
    ? [...suppliers].sort((a, b) => b.rating - a.rating)
    : suppliers;

  const toggleFavorite = (supplierId: number) => {
    setFavoriteSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                workr
              </h1>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-semibold text-gray-900">
                {showLeaderboard ? "Top Suppliers" : "Find Suppliers"}
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* Reels Section */}
      <ReelsSection reels={reels} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterSection 
          onFiltersChange={setFilters}
          showLeaderboard={showLeaderboard}
          onToggleLeaderboard={() => setShowLeaderboard(!showLeaderboard)}
        />

        <SuppliersGrid
          suppliers={sortedSuppliers}
          showLeaderboard={showLeaderboard}
          favoriteSuppliers={favoriteSuppliers}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      <BottomNavigation activeTab="catalog" />
    </div>
  );
};

export default Catalog;

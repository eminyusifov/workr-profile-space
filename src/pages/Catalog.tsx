
import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
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
      <PageHeader 
        title={showLeaderboard ? "Top Suppliers" : "Find Suppliers"}
        showBackButton
      />

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

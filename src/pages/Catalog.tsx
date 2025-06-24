
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import FilterSection from "@/components/catalog/FilterSection";
import SuppliersGrid from "@/components/catalog/SuppliersGrid";

const Catalog = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [favoriteSuppliers, setFavoriteSuppliers] = useState<number[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState(mockSuppliers);

  const handleFiltersChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Apply filters to suppliers
    let filtered = mockSuppliers;
    
    if (filters.searchQuery) {
      filtered = filtered.filter(supplier => 
        supplier.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        supplier.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    
    if (filters.selectedCategory) {
      filtered = filtered.filter(supplier => supplier.category === filters.selectedCategory);
    }
    
    if (filters.selectedSkills && filters.selectedSkills.length > 0) {
      filtered = filtered.filter(supplier => 
        filters.selectedSkills.some((skill: string) => 
          supplier.tools.includes(skill) || supplier.category.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }
    
    setFilteredSuppliers(filtered);
  };

  const handleToggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
    if (!showLeaderboard) {
      // Sort by rating when leaderboard is enabled
      const sorted = [...filteredSuppliers].sort((a, b) => b.rating - a.rating);
      setFilteredSuppliers(sorted);
    }
  };

  const handleToggleFavorite = (id: number) => {
    setFavoriteSuppliers(prev => 
      prev.includes(id) 
        ? prev.filter(supplierId => supplierId !== id)
        : [...prev, id]
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Catalog" showSearch />
        
        <div className="pt-4">
          <FilterSection 
            onFiltersChange={handleFiltersChange}
            showLeaderboard={showLeaderboard}
            onToggleLeaderboard={handleToggleLeaderboard}
          />
          <SuppliersGrid 
            suppliers={filteredSuppliers}
            showLeaderboard={showLeaderboard}
            favoriteSuppliers={favoriteSuppliers}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        <BottomNavigation activeTab="catalog" />
      </div>
    </ThemeProvider>
  );
};

// Mock data for suppliers
const mockSuppliers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahj",
    rating: 4.9,
    reviews: 127,
    category: "UX/UI Design",
    price: "$80/hour",
    status: "Available",
    workStatus: "Freelance",
    languages: ["EN", "FR"],
    tools: ["Figma", "Sketch"],
    avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
    completedProjects: 45,
    responseTime: "2 hours",
    description: "Expert UX/UI designer with 5+ years of experience",
    verified: true
  },
  {
    id: 2,
    name: "Alex Chen",
    username: "@alexchen",
    rating: 4.8,
    reviews: 89,
    category: "Web Development",
    price: "$90/hour",
    status: "Busy",
    workStatus: "Working",
    languages: ["EN", "ZH"],
    tools: ["React", "Node.js"],
    avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
    completedProjects: 62,
    responseTime: "4 hours",
    description: "Full-stack developer specializing in React and Node.js",
    verified: true
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    username: "@mariarodriguez",
    rating: 4.7,
    reviews: 156,
    category: "Graphic Design",
    price: "$65/hour",
    status: "Available",
    workStatus: "Freelance",
    languages: ["EN", "ES"],
    tools: ["Photoshop", "Illustrator"],
    avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
    completedProjects: 78,
    responseTime: "1 hour",
    description: "Creative graphic designer with a passion for branding",
    verified: false
  },
  {
    id: 4,
    name: "David Kim",
    username: "@davidkim",
    rating: 4.6,
    reviews: 92,
    category: "Mobile Development",
    price: "$85/hour",
    status: "Available",
    workStatus: "Freelance",
    languages: ["EN", "KR"],
    tools: ["React Native", "Swift"],
    avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
    completedProjects: 34,
    responseTime: "3 hours",
    description: "Mobile app developer with expertise in iOS and Android",
    verified: true
  }
];

export default Catalog;

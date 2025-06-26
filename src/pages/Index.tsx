import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import CategoryFilter from "@/components/shared/CategoryFilter";
import ReelsSection from "@/components/messages/ReelsSection";
import BottomNavigation from "@/components/shared/BottomNavigation";
import SpecialistGrid from "@/components/shared/SpecialistGrid";
import LoadingGrid from "@/components/shared/LoadingGrid";
import { useSpecialists } from "@/hooks/useSpecialists";
import AdvancedSearch from "@/components/shared/AdvancedSearch";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { specialists, isLoading, error } = useSpecialists();
  const { user } = useAuth();

  const categories = ["All", "Graphic", "UX/UI", "Photo", "SMM", "Animation", "Web Dev", "Mobile"];
  
  // Mock reels data for main screen
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
    },
    {
      id: 4,
      user: { name: "David Kim", username: "@davidkim", avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png" },
      thumbnail: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      title: "Product Photography"
    },
    {
      id: 5,
      user: { name: "Emma Wilson", username: "@emmawilson", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "Motion Graphics"
    }
  ];

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           specialist.skills.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const rightContent = user ? (
    <Link to="/profile">
      <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
        <AvatarImage src="/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" />
        <AvatarFallback>
          {user?.user_metadata?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
    </Link>
  ) : (
    <Link to="/auth">
      <Button className="bg-blue-600 hover:bg-blue-700">
        Sign In
      </Button>
    </Link>
  );

  if (error) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <PageHeader showSettings rightContent={rightContent} />
        
        <ReelsSection reels={reels} />

        <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Enhanced background with proper gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-purple-900/20"></div>
          
          {/* Floating elements with fixed blur */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in-up">
              Find the Perfect <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative</span> Professional
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Connect with talented specialists across design, development, and digital marketing. Build your dream team today.
            </p>

            {/* Advanced Search */}
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <AdvancedSearch
                placeholder="Search for specialists, skills, or services..."
                value={searchQuery}
                onChange={setSearchQuery}
                showAdvanced={true}
              />
            </div>

            {/* CTA Section */}
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Join thousands of successful collaborations</p>
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>1000+ Active Specialists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>98% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {isLoading ? (
          <LoadingGrid count={6} title="Artists" />
        ) : (
          <SpecialistGrid 
            specialists={filteredSpecialists}
            title="Artists"
          />
        )}

        <BottomNavigation activeTab="main" />
      </div>
    </ThemeProvider>
  );
};

export default Index;

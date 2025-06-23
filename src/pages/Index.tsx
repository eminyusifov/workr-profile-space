
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
import FloatingActionButton from "@/components/shared/FloatingActionButton";
import AdvancedSearch from "@/components/shared/AdvancedSearch";
import { useSpecialists } from "@/hooks/useSpecialists";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { specialists, isLoading, error } = useSpecialists();

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
    }
  ];

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           specialist.skills.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleAdvancedSearch = (filters: any) => {
    console.log("Advanced search filters:", filters);
    // TODO: Implement advanced filtering logic
  };

  const rightContent = (
    <Link to="/profile">
      <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
        <AvatarImage src="/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
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
          {/* Enhanced background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-purple-900/20"></div>
          <div 
            className="absolute inset-0 opacity-30 dark:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
            }}
          ></div>
          
          {/* Floating elements - using rounded divs instead of gradients */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in-up">
              Find the Perfect <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative</span> Professional
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Connect with talented specialists across design, development, and digital marketing. Build your dream team today.
            </p>
            
            <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <AdvancedSearch
                placeholder="Search for specialists, skills, or services..."
                value={searchQuery}
                onChange={setSearchQuery}
                showAdvanced={true}
                onAdvancedSearch={handleAdvancedSearch}
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

        <FloatingActionButton />
        <BottomNavigation activeTab="main" />
      </div>
    </ThemeProvider>
  );
};

export default Index;

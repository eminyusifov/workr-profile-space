
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import SpecialistGrid from "@/components/shared/SpecialistGrid";
import { useSpecialists } from "@/hooks/useSpecialists";

const Favorites = () => {
  const { specialists, isLoading } = useSpecialists();
  
  // Mock favorites - in a real app, this would come from user preferences
  const favoriteSpecialists = specialists.slice(0, 3);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Favorites" showBackButton />
        
        <div className="py-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">Loading favorites...</p>
            </div>
          ) : favoriteSpecialists.length > 0 ? (
            <SpecialistGrid 
              specialists={favoriteSpecialists}
              title="Your Favorite Specialists"
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No favorites yet</p>
            </div>
          )}
        </div>

        <BottomNavigation activeTab="favorites" />
      </div>
    </ThemeProvider>
  );
};

export default Favorites;

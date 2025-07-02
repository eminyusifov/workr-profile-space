
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import SpecialistGrid from "@/components/shared/SpecialistGrid";
import { useSpecialists } from "@/hooks/useSpecialists";
import { useFavorites } from "@/components/shared/FavoritesProvider";

const Favorites = () => {
  const { specialists, isLoading } = useSpecialists();
  const { favorites } = useFavorites();
  
  // Filter specialists to show only favorites
  const favoriteSpecialists = specialists.filter(specialist => 
    favorites.includes(specialist.id)
  );

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
              <p className="text-sm text-gray-500 mt-2">Add specialists to your favorites by clicking the heart icon on their profiles</p>
            </div>
          )}
        </div>

        <BottomNavigation activeTab="favorites" />
      </div>
    </ThemeProvider>
  );
};

export default Favorites;


import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import FilterSection from "@/components/catalog/FilterSection";
import SuppliersGrid from "@/components/catalog/SuppliersGrid";

const Catalog = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Catalog" showSearch />
        
        <div className="pt-4">
          <FilterSection />
          <SuppliersGrid />
        </div>

        <BottomNavigation activeTab="catalog" />
      </div>
    </ThemeProvider>
  );
};

export default Catalog;

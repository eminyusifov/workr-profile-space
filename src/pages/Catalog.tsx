
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import SuppliersGrid from "@/components/catalog/SuppliersGrid";
import FilterSection from "@/components/catalog/FilterSection";
import EnhancedSearch from "@/components/shared/EnhancedSearch";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 5000] as [number, number],
    rating: 0,
    location: "",
    availability: "all"
  });

  // Mock suppliers data
  const suppliers = [
    {
      id: 1,
      name: "Creative Studio Pro",
      description: "Professional design services for modern businesses",
      rating: 4.8,
      reviews: 124,
      price: "$80/hour",
      category: "Design",
      location: "New York, NY",
      image: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      tags: ["Branding", "Web Design", "UI/UX"]
    },
    {
      id: 2,
      name: "Digital Marketing Experts",
      description: "Grow your business with data-driven marketing strategies",
      rating: 4.9,
      reviews: 89,
      price: "$120/hour",
      category: "Marketing",
      location: "Los Angeles, CA",
      image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      tags: ["SEO", "Social Media", "PPC"]
    },
    {
      id: 3,
      name: "Code Craft Solutions",
      description: "Full-stack development with modern technologies",
      rating: 4.7,
      reviews: 156,
      price: "$95/hour",
      category: "Development",
      location: "Austin, TX",
      image: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      tags: ["React", "Node.js", "Python"]
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filters.category === "All" || supplier.category === filters.category;
    const matchesRating = supplier.rating >= filters.rating;
    const matchesLocation = !filters.location || supplier.location.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesRating && matchesLocation;
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Catalog" showBackButton />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Find the Perfect Service Provider</h1>
            <EnhancedSearch
              placeholder="Search suppliers, services, or skills..."
              value={searchQuery}
              onChange={setSearchQuery}
              showTrending={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterSection 
                filters={filters}
                onFiltersChange={handleFilterChange}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredSuppliers.length} suppliers found
                </p>
              </div>
              
              <SuppliersGrid suppliers={filteredSuppliers} />
            </div>
          </div>
        </div>

        <BottomNavigation activeTab="catalog" />
      </div>
    </ThemeProvider>
  );
};

export default Catalog;

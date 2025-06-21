
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, className = "" }: CategoryFilterProps) => {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 mb-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-6 py-3 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
                  : "border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg"
              } animate-fade-in`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;

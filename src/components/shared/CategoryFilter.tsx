
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-6 py-2 transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  : "border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }`}
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

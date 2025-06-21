
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  searchPlaceholder = "Search...", 
  searchValue = "", 
  onSearchChange,
  showSearch = true 
}: HeroSectionProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        {showSearch && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full h-14 px-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

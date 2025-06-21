
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  className?: string;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  searchPlaceholder = "Search...", 
  searchValue = "", 
  onSearchChange,
  showSearch = true,
  className = ""
}: HeroSectionProps) => {
  return (
    <section className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}>
      {/* Background with improved gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        {showSearch && (
          <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
            <div className="relative group">
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full h-16 px-8 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl focus:shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

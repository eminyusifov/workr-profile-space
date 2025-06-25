
import { useState, useRef, useEffect } from "react";
import { Search, TrendingUp, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EnhancedSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  showTrending?: boolean;
}

const EnhancedSearch = ({ 
  placeholder = "Search...", 
  value, 
  onChange,
  showTrending = false 
}: EnhancedSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingSearches = [
    "UX/UI Designer",
    "Frontend Developer", 
    "Logo Design",
    "Mobile App",
    "Branding",
    "WordPress"
  ];

  const recentSearches = [
    "Graphic Designer",
    "Social Media Manager",
    "Content Writer"
  ];

  const suggestions = value ? [] : [...recentSearches, ...trendingSearches];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleInputFocus}
          className={`pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border-2 rounded-2xl shadow-sm transition-all duration-300 ${
            isFocused 
              ? 'border-blue-500 shadow-lg ring-4 ring-blue-100 dark:ring-blue-900' 
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
          }`}
        />
      </div>

      {/* Suggestions Dropdown - Higher z-index */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[60]">
          <div className="p-4">
            {recentSearches.length > 0 && !value && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Recent</span>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {showTrending && !value && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Trending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
                      onClick={() => handleSuggestionClick(trend)}
                    >
                      {trend}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;

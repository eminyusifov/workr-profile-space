
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter, TrendingUp } from "lucide-react";

interface EnhancedSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  showTrending?: boolean;
}

const EnhancedSearch = ({ 
  placeholder = "Search...", 
  value, 
  onChange,
  onFilterClick,
  showTrending = false
}: EnhancedSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingSearches = [
    "UX/UI Designer",
    "React Developer", 
    "Graphic Designer",
    "Full Stack Developer",
    "Mobile App Designer"
  ];

  const recentSearches = [
    "Logo designer",
    "Web developer",
    "Brand identity"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <div className={`relative transition-all duration-300 ${
        isFocused ? 'transform scale-105' : ''
      }`}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          className={`pl-12 pr-20 h-14 rounded-2xl border-2 transition-all duration-300 ${
            isFocused 
              ? 'border-blue-500 shadow-lg bg-white' 
              : 'border-gray-200 bg-white/80'
          }`}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange('')}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {onFilterClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterClick}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <Filter className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (isFocused || value) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in">
          <div className="p-4">
            {value ? (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Search Results</h4>
                <div className="space-y-2">
                  {trendingSearches
                    .filter(item => item.toLowerCase().includes(value.toLowerCase()))
                    .slice(0, 3)
                    .map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onChange(item);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Search className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSearches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Searches</h4>
                    <div className="space-y-1">
                      {recentSearches.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            onChange(item);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Search className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{item}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {showTrending && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                      Trending
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.slice(0, 3).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            onChange(item);
                            setShowSuggestions(false);
                          }}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;

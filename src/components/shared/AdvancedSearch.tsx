import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter, SlidersHorizontal, MapPin, Clock, Star } from "lucide-react";

interface AdvancedSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  showAdvanced?: boolean;
  onAdvancedSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  skills: string[];
  priceRange: [number, number];
  rating: number;
  availability: string;
  location: string;
}

const AdvancedSearch = ({ 
  placeholder = "Search specialists, skills, or services...", 
  value, 
  onChange,
  onFilterClick,
  showAdvanced = true,
  onAdvancedSearch
}: AdvancedSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    skills: [],
    priceRange: [0, 5000],
    rating: 0,
    availability: "all",
    location: ""
  });
  
  const inputRef = useRef<HTMLInputElement>(null);

  const popularSkills = [
    "UX/UI Design", "Web Development", "Graphic Design", "Mobile App Design",
    "React", "Node.js", "Python", "Figma", "Photoshop", "Video Editing",
    "SEO", "Social Media", "Content Writing", "Translation", "Animation"
  ];

  const trendingSearches = [
    "UX/UI Designer",
    "React Developer", 
    "Graphic Designer",
    "Full Stack Developer",
    "Mobile App Designer",
    "Logo Designer",
    "Video Editor",
    "Content Writer"
  ];

  const recentSearches = [
    "Logo designer",
    "Web developer", 
    "Brand identity",
    "React specialist"
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

  const toggleSkillFilter = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const applyFilters = () => {
    onAdvancedSearch?.(filters);
    setShowFilters(false);
  };

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className={`relative transition-all duration-300 ${
        isFocused ? 'transform scale-[1.02]' : ''
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
          className={`pl-12 pr-24 h-14 rounded-2xl border-2 transition-all duration-300 text-base ${
            isFocused 
              ? 'border-blue-500 shadow-lg bg-white ring-2 ring-blue-100' 
              : 'border-gray-200 bg-white/80 hover:border-gray-300'
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
          {showAdvanced && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-8 w-8 p-0 rounded-full transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
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

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Star className="h-4 w-4 mr-2 text-blue-500" />
                Skills
              </h4>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {popularSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleSkillFilter(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Other Filters */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-green-500" />
                  Location
                </h4>
                <Input
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="h-10"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-500" />
                  Availability
                </h4>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">All</option>
                  <option value="available">Available Now</option>
                  <option value="busy">Busy</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowFilters(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={applyFilters}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Search Suggestions */}
      {showSuggestions && (isFocused || value) && !showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in">
          <div className="p-4">
            {value ? (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Search Results</h4>
                <div className="space-y-2">
                  {trendingSearches
                    .filter(item => item.toLowerCase().includes(value.toLowerCase()))
                    .slice(0, 4)
                    .map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onChange(item);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="text-gray-700 group-hover:text-blue-700">{item}</span>
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
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            <span className="text-gray-600">{item}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.slice(0, 6).map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onChange(skill);
                          setShowSuggestions(false);
                        }}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;

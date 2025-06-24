
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Trophy } from "lucide-react";

interface FilterSectionProps {
  filters: {
    category: string;
    priceRange: [number, number];
    rating: number;
    location: string;
    availability: string;
  };
  onFiltersChange: (filters: {
    category: string;
    priceRange: [number, number];
    rating: number;
    location: string;
    availability: string;
  }) => void;
}

const FilterSection = ({ filters, onFiltersChange }: FilterSectionProps) => {
  const categories = [
    "All",
    "Design",
    "Marketing", 
    "Development",
    "Photography",
    "Writing"
  ];

  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      category: value
    });
  };

  const handleLocationChange = (value: string) => {
    onFiltersChange({
      ...filters,
      location: value
    });
  };

  const handleRatingChange = (value: number) => {
    onFiltersChange({
      ...filters,
      rating: value
    });
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
        
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Category</label>
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Location</label>
          <Input
            placeholder="Enter location..."
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        {/* Minimum Rating Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Minimum Rating</label>
          <Select value={filters.rating.toString()} onValueChange={(value) => handleRatingChange(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Trophy } from "lucide-react";

interface FilterSectionProps {
  onFiltersChange: (filters: any) => void;
  showLeaderboard: boolean;
  onToggleLeaderboard: () => void;
}

const FilterSection = ({ onFiltersChange, showLeaderboard, onToggleLeaderboard }: FilterSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const categories = [
    "UX/UI Design",
    "Web Development", 
    "Graphic Design",
    "Mobile Development",
    "Branding",
    "Photography"
  ];

  const skills = [
    "React", "Figma", "Photoshop", "Sketch", "Node.js", "TypeScript", "Python", "Vue.js"
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFiltersChange({ searchQuery: value, selectedCategory, selectedSkills });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onFiltersChange({ searchQuery, selectedCategory: value, selectedSkills });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    onFiltersChange({ searchQuery, selectedCategory, selectedSkills: newSkills });
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 mx-4 sm:mx-6 lg:mx-8">
      <div className="space-y-4">
        {/* Search and Leaderboard Toggle */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search specialists..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showLeaderboard ? "default" : "outline"}
            onClick={onToggleLeaderboard}
            className="flex items-center space-x-2"
          >
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
          </Button>
        </div>

        {/* Category Filter */}
        <div>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;

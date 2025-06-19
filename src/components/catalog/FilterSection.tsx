
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Star, Filter, ChevronDown } from "lucide-react";

interface FilterSectionProps {
  onFiltersChange: (filters: any) => void;
  showLeaderboard: boolean;
  onToggleLeaderboard: () => void;
}

const FilterSection = ({ onFiltersChange, showLeaderboard, onToggleLeaderboard }: FilterSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [workStatus, setWorkStatus] = useState("");
  const [availability, setAvailability] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = ["UX/UI Design", "Graphic Design", "Web Development", "Mobile Development", "Branding", "Photography"];
  const languages = ["AZ", "RU", "EN", "TR"];
  const tools = ["Figma", "Photoshop", "Sketch", "React", "Vue", "Angular"];
  const workStatuses = ["Working", "Not Working", "Freelance"];
  const availabilityOptions = ["Free", "Busy", "Available Soon"];

  const toggleLanguage = (language: string) => {
    const updated = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(updated);
    onFiltersChange({ searchQuery, selectedCategory, selectedLanguages: updated, selectedTools, workStatus, availability });
  };

  const toggleTool = (tool: string) => {
    const updated = selectedTools.includes(tool)
      ? selectedTools.filter(t => t !== tool)
      : [...selectedTools, tool];
    setSelectedTools(updated);
    onFiltersChange({ searchQuery, selectedCategory, selectedLanguages, selectedTools: updated, workStatus, availability });
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value === "all" ? "" : value;
    setSelectedCategory(newCategory);
    onFiltersChange({ searchQuery, selectedCategory: newCategory, selectedLanguages, selectedTools, workStatus, availability });
  };

  const handleWorkStatusChange = (value: string) => {
    const newStatus = value === "all" ? "" : value;
    setWorkStatus(newStatus);
    onFiltersChange({ searchQuery, selectedCategory, selectedLanguages, selectedTools, workStatus: newStatus, availability });
  };

  const handleAvailabilityChange = (value: string) => {
    const newAvailability = value === "all" ? "" : value;
    setAvailability(newAvailability);
    onFiltersChange({ searchQuery, selectedCategory, selectedLanguages, selectedTools, workStatus, availability: newAvailability });
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl mb-6">
      {/* Header with Search and Toggle Buttons */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
          <Button
            variant={showLeaderboard ? "default" : "outline"}
            onClick={onToggleLeaderboard}
            className="flex items-center space-x-2"
          >
            <Star className="h-4 w-4" />
            <span>Leaderboard</span>
          </Button>
        </div>

        {/* Search - Always visible */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search specialists..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onFiltersChange({ searchQuery: e.target.value, selectedCategory, selectedLanguages, selectedTools, workStatus, availability });
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Collapsible Filters */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent>
          <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
              <div className="flex flex-wrap gap-2">
                {languages.map(language => (
                  <Badge
                    key={language}
                    variant={selectedLanguages.includes(language) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tools</label>
              <div className="flex flex-wrap gap-2">
                {tools.map(tool => (
                  <Badge
                    key={tool}
                    variant={selectedTools.includes(tool) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTool(tool)}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Work Status & Availability */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Status</label>
                <Select value={workStatus || "all"} onValueChange={handleWorkStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Status</SelectItem>
                    {workStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <Select value={availability || "all"} onValueChange={handleAvailabilityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Availability</SelectItem>
                    {availabilityOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterSection;

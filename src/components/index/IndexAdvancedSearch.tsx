
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star } from "lucide-react";

interface IndexAdvancedSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdvancedSearch: (filters: any) => void;
}

const IndexAdvancedSearch = ({ searchQuery, onSearchChange, onAdvancedSearch }: IndexAdvancedSearchProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("All");

  const skills = [
    "UX/UI Design", "Web Development", "Graphic Design", "Mobile App Design",
    "React", "Node.js", "Python", "Figma", "Photoshop", "Video Editing", "SEO"
  ];

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    onAdvancedSearch({ searchQuery, selectedSkills: newSkills, location, availability });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onAdvancedSearch({ searchQuery, selectedSkills, location: value, availability });
  };

  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
    onAdvancedSearch({ searchQuery, selectedSkills, location, availability: value });
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto">
        {/* Main Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for specialists, skills, or services..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-16 h-12 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-4 bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skills Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 text-xs"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
            </div>
            <Input
              placeholder="Enter location..."
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Availability Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Availability</h3>
            </div>
            <Select value={availability} onValueChange={handleAvailabilityChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Available">Available Now</SelectItem>
                <SelectItem value="Busy">Busy</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Working">Full-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexAdvancedSearch;

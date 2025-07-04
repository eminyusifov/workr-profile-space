import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Filter, X, MapPin, Clock, DollarSign, Star, Award, Languages } from "lucide-react";

interface AdvancedFiltersProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

const AdvancedFilters = ({ onFiltersChange, initialFilters = {} }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState({
    skills: [],
    priceRange: [0, 200],
    rating: 0,
    location: "",
    availability: "all",
    experience: "all",
    languages: [],
    tools: [],
    workArrangement: "all",
    responseTime: "all",
    projectSize: "all",
    certifications: false,
    topRated: false,
    ...initialFilters
  });

  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    pricing: true,
    location: false,
    experience: false,
    tools: false,
    preferences: false
  });

  const skillCategories = {
    "Design": ["UI/UX Design", "Graphic Design", "Web Design", "Mobile Design", "Brand Identity"],
    "Development": ["Frontend", "Backend", "Full-Stack", "Mobile Development", "DevOps"],
    "Marketing": ["Digital Marketing", "SEO", "Social Media", "Content Marketing", "PPC"],
    "Content": ["Content Writing", "Copywriting", "Technical Writing", "Translation", "Video Editing"]
  };

  const tools = [
    "Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "After Effects",
    "React", "Vue.js", "Angular", "Node.js", "Python", "WordPress"
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese", "Portuguese", "Russian"
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item: string) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearFilters = () => {
    const clearedFilters = {
      skills: [],
      priceRange: [0, 200],
      rating: 0,
      location: "",
      availability: "all",
      experience: "all",
      languages: [],
      tools: [],
      workArrangement: "all",
      responseTime: "all",
      projectSize: "all",
      certifications: false,
      topRated: false
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.skills.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) count++;
    if (filters.rating > 0) count++;
    if (filters.location) count++;
    if (filters.availability !== "all") count++;
    if (filters.experience !== "all") count++;
    if (filters.languages.length > 0) count++;
    if (filters.tools.length > 0) count++;
    if (filters.workArrangement !== "all") count++;
    if (filters.responseTime !== "all") count++;
    if (filters.projectSize !== "all") count++;
    if (filters.certifications) count++;
    if (filters.topRated) count++;
    return count;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Skills & Expertise */}
        <Collapsible open={expandedSections.skills} onOpenChange={() => toggleSection('skills')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Skills & Expertise</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.skills ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category}>
                <Label className="text-sm font-medium text-gray-700">{category}</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={filters.skills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => toggleArrayFilter('skills', skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Pricing & Rating */}
        <Collapsible open={expandedSections.pricing} onOpenChange={() => toggleSection('pricing')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">Pricing & Rating</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.pricing ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <div>
              <Label className="text-sm font-medium">Hourly Rate: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                max={200}
                step={5}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <Select value={filters.rating.toString()} onValueChange={(value) => updateFilter('rating', Number(value))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Location & Availability */}
        <Collapsible open={expandedSections.location} onOpenChange={() => toggleSection('location')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Location & Availability</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.location ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <div>
              <Label className="text-sm font-medium">Location</Label>
              <Input
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Availability</Label>
              <Select value={filters.availability} onValueChange={(value) => updateFilter('availability', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="part-time">Part-time Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Work Arrangement</Label>
              <Select value={filters.workArrangement} onValueChange={(value) => updateFilter('workArrangement', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Experience & Response Time */}
        <Collapsible open={expandedSections.experience} onOpenChange={() => toggleSection('experience')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Experience & Response</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.experience ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <div>
              <Label className="text-sm font-medium">Experience Level</Label>
              <Select value={filters.experience} onValueChange={(value) => updateFilter('experience', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  <SelectItem value="expert">Expert (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Response Time</Label>
              <Select value={filters.responseTime} onValueChange={(value) => updateFilter('responseTime', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="1h">Within 1 hour</SelectItem>
                  <SelectItem value="4h">Within 4 hours</SelectItem>
                  <SelectItem value="24h">Within 24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Project Size Preference</Label>
              <Select value={filters.projectSize} onValueChange={(value) => updateFilter('projectSize', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small ($500-$2K)</SelectItem>
                  <SelectItem value="medium">Medium ($2K-$10K)</SelectItem>
                  <SelectItem value="large">Large ($10K+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Tools & Languages */}
        <Collapsible open={expandedSections.tools} onOpenChange={() => toggleSection('tools')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4 text-indigo-500" />
              <span className="font-medium">Tools & Languages</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.tools ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <div>
              <Label className="text-sm font-medium">Tools & Software</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant={filters.tools.includes(tool) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleArrayFilter('tools', tool)}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Languages</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.map((language) => (
                  <Badge
                    key={language}
                    variant={filters.languages.includes(language) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleArrayFilter('languages', language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Special Preferences */}
        <Collapsible open={expandedSections.preferences} onOpenChange={() => toggleSection('preferences')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Special Preferences</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.preferences ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.topRated}
                onCheckedChange={(checked) => updateFilter('topRated', checked)}
              />
              <Label className="text-sm">Top Rated Specialists Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.certifications}
                onCheckedChange={(checked) => updateFilter('certifications', checked)}
              />
              <Label className="text-sm">Has Professional Certifications</Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => toggleArrayFilter('skills', skill)}
                  />
                </Badge>
              ))}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
                <Badge variant="secondary" className="text-xs">
                  ${filters.priceRange[0]}-${filters.priceRange[1]}/hr
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => updateFilter('priceRange', [0, 200])}
                  />
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {filters.rating}+ stars
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => updateFilter('rating', 0)}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
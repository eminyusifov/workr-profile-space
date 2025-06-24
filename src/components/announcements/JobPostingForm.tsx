
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobPostingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    timeline: "",
    experience: "",
    location: ""
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isDraft, setIsDraft] = useState(false);

  const skills = [
    "UX/UI Design", "Web Development", "Graphic Design", "Mobile Development",
    "React", "Node.js", "Python", "Figma", "Photoshop", "Illustrator"
  ];

  const categories = [
    "UX/UI Design", "Web Development", "Graphic Design", 
    "Mobile Development", "Branding", "Photography", "Animation"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", { ...formData, skills: selectedSkills });
    setIsDraft(true);
    toast({
      title: "Draft Saved",
      description: "Your job posting has been saved as a draft.",
    });
  };

  const handlePostJob = () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Posting job:", { ...formData, skills: selectedSkills });
    toast({
      title: "Job Posted",
      description: "Your job posting has been published successfully.",
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      budget: "",
      timeline: "",
      experience: "",
      location: ""
    });
    setSelectedSkills([]);
    setIsDraft(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Post a Job
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Need a Logo Designer for Startup"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
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

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your project requirements, goals, and expectations..."
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <Label>Required Skills</Label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
                {selectedSkills.includes(skill) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Budget and Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              placeholder="e.g., $500-$1000"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline</Label>
            <Input
              id="timeline"
              placeholder="e.g., 2 weeks"
              value={formData.timeline}
              onChange={(e) => handleInputChange("timeline", e.target.value)}
            />
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., Remote, New York, etc."
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            className="flex-1"
          >
            Save Draft
          </Button>
          <Button 
            onClick={handlePostJob}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Post Job
          </Button>
        </div>

        {isDraft && (
          <div className="text-sm text-green-600 dark:text-green-400 text-center">
            Draft saved successfully!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;

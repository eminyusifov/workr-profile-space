
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, MapPin, Clock, Users, Briefcase } from "lucide-react";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    location: "",
    workType: "",
    experienceLevel: "",
    skills: [] as string[]
  });

  const [availableSkills] = useState([
    "React", "Node.js", "Python", "Figma", "Photoshop", "UI/UX", "JavaScript", "TypeScript"
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job posting submitted:", formData);
    // Handle form submission
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>Post a Job</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. UI/UX Designer for Mobile App"
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the project requirements, goals, and expectations..."
              rows={4}
              className="mt-1"
            />
          </div>

          {/* Category and Work Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Work Type</Label>
              <Select value={formData.workType} onValueChange={(value) => setFormData(prev => ({ ...prev, workType: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget" className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>Budget</span>
              </Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="e.g. $500 - $1000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="deadline" className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Deadline</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          {/* Location and Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Remote, New York, etc."
                className="mt-1"
              />
            </div>

            <div>
              <Label className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Experience Level</span>
              </Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={formData.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button">
              Save Draft
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Post Job
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;

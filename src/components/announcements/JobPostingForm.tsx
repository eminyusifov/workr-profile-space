
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JobPostingFormProps {
  onSubmit?: (jobData: any) => void;
}

const JobPostingForm = ({ onSubmit }: JobPostingFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    budget: "",
    deadline: "",
    description: "",
    skillsRequired: "",
    location: "remote"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Job posting submitted:", formData);
      alert("Job posting created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        category: "",
        budget: "",
        deadline: "",
        description: "",
        skillsRequired: "",
        location: "remote"
      });
      
      setIsSubmitting(false);
      
      if (onSubmit) {
        onSubmit(formData);
      }
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Job Posting</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Logo Design for Tech Startup"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                <SelectItem value="content-writing">Content Writing</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="video-editing">Video Editing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="500"
                required
              />
            </div>
            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your project requirements, goals, and any specific details..."
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="skills">Required Skills</Label>
            <Input
              id="skills"
              value={formData.skillsRequired}
              onChange={(e) => handleInputChange("skillsRequired", e.target.value)}
              placeholder="e.g., Adobe Illustrator, Brand Design, Logo Creation"
            />
          </div>

          <div>
            <Label htmlFor="location">Work Location</Label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="on-site">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Job Posting"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setFormData({
                  title: "",
                  category: "",
                  budget: "",
                  deadline: "",
                  description: "",
                  skillsRequired: "",
                  location: "remote"
                });
              }}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ProjectBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialistName?: string;
  specialistId?: number;
}

const ProjectBriefModal = ({ isOpen, onClose, specialistName, specialistId }: ProjectBriefModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectType: "",
    description: "",
    budget: "",
    timeline: "",
    requirements: "",
    deliverables: "",
    communicationPreference: "email"
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<Date>();
  const [attachments, setAttachments] = useState<File[]>([]);

  const projectTypes = [
    "Logo Design", "Website Design", "Mobile App", "Branding", "Marketing Campaign",
    "Video Production", "Photography", "Content Writing", "Social Media", "Consulting"
  ];

  const requiredSkills = [
    "UI/UX Design", "Graphic Design", "Web Development", "Mobile Development",
    "Photography", "Video Editing", "Content Writing", "SEO", "Social Media Marketing"
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.projectTitle || !formData.description || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Project brief submitted:", {
      ...formData,
      skills: selectedSkills,
      deadline,
      attachments,
      specialistId
    });

    toast({
      title: "Project Brief Sent!",
      description: `Your project brief has been sent to ${specialistName || 'the specialist'}.`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Send Project Brief {specialistName && `to ${specialistName}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Project Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectTitle">Project Title *</Label>
              <Input
                id="projectTitle"
                placeholder="e.g., Logo Design for Tech Startup"
                value={formData.projectTitle}
                onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your project in detail..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Required Skills */}
          <div>
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {requiredSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                placeholder="e.g., $1000-$2000"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g., 2-3 weeks"
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              />
            </div>
            <div>
              <Label>Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Requirements and Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Any specific requirements or constraints..."
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="deliverables">Expected Deliverables</Label>
              <Textarea
                id="deliverables"
                placeholder="What do you expect to receive..."
                rows={3}
                value={formData.deliverables}
                onChange={(e) => setFormData({...formData, deliverables: e.target.value})}
              />
            </div>
          </div>

          {/* File Attachments */}
          <div>
            <Label>Attachments</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Files
                  </span>
                </Button>
              </label>
              {attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Communication Preference */}
          <div>
            <Label>Preferred Communication Method</Label>
            <Select value={formData.communicationPreference} onValueChange={(value) => setFormData({...formData, communicationPreference: value})}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="platform">Platform Messages</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Send Project Brief
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectBriefModal;
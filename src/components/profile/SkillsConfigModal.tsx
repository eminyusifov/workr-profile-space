
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkills: string[];
  onSave: (skills: string[], certifications: string[]) => void;
}

const AVAILABLE_SKILLS = [
  "UX/UI Design", "Graphic Design", "Web Development", "Mobile Development",
  "Photography", "Video Editing", "Animation", "Motion Graphics",
  "Social Media Marketing", "Content Writing", "SEO", "Brand Identity",
  "Illustration", "3D Modeling", "Game Design", "Product Design"
];

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const SkillsConfigModal = ({ isOpen, onClose, currentSkills, onSave }: SkillsConfigModalProps) => {
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(currentSkills);
  const [skillLevels, setSkillLevels] = useState<Record<string, string>>({});
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newCertification, setNewCertification] = useState("");

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
      setSkillLevels(prev => {
        const updated = { ...prev };
        delete updated[skill];
        return updated;
      });
    } else {
      setSelectedSkills(prev => [...prev, skill]);
      setSkillLevels(prev => ({ ...prev, [skill]: "Intermediate" }));
    }
  };

  const handleLevelChange = (skill: string, level: string) => {
    setSkillLevels(prev => ({ ...prev, [skill]: level }));
  };

  const addCertification = () => {
    if (newCertification.trim() && !certifications.includes(newCertification.trim())) {
      setCertifications(prev => [...prev, newCertification.trim()]);
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setCertifications(prev => prev.filter(c => c !== cert));
  };

  const handleSave = () => {
    onSave(selectedSkills, certifications);
    toast({
      title: "Skills Updated",
      description: "Your skills and certifications have been saved successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Skills & Expertise</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Skills Selection */}
          <div>
            <Label className="text-base font-semibold">Select Your Skills</Label>
            <p className="text-sm text-gray-600 mb-4">Choose the skills you offer and set your proficiency level</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AVAILABLE_SKILLS.map((skill) => (
                <div key={skill} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label className="flex-1">{skill}</Label>
                  </div>
                  
                  {selectedSkills.includes(skill) && (
                    <Select
                      value={skillLevels[skill] || "Intermediate"}
                      onValueChange={(value) => handleLevelChange(skill, value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {SKILL_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Skills Preview */}
          {selectedSkills.length > 0 && (
            <div>
              <Label className="text-base font-semibold">Selected Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="default" className="bg-blue-100 text-blue-800">
                    {skill} ({skillLevels[skill] || "Intermediate"})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          <div>
            <Label className="text-base font-semibold">Certifications</Label>
            <p className="text-sm text-gray-600 mb-4">Add your professional certifications and achievements</p>
            
            <div className="flex space-x-2 mb-4">
              <Input
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="e.g., Adobe Certified Expert, Google Analytics Certified"
                onKeyPress={(e) => e.key === 'Enter' && addCertification()}
              />
              <Button onClick={addCertification} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {certifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="pr-1">
                    {cert}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                      onClick={() => removeCertification(cert)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={selectedSkills.length === 0}>
            Save Skills
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsConfigModal;

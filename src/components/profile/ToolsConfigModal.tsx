
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Monitor, Smartphone, Camera, Paintbrush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ToolsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTools: string[];
  onSave: (tools: string[], equipment: string[], licenses: string[]) => void;
}

const TOOL_CATEGORIES = {
  design: {
    label: "Design Software",
    icon: Paintbrush,
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Sketch", "Adobe XD", "Canva Pro", "Affinity Designer"]
  },
  development: {
    label: "Development Tools",
    icon: Monitor,
    tools: ["VS Code", "Adobe Dreamweaver", "Webflow", "WordPress", "Shopify", "React", "Vue.js", "Angular"]
  },
  video: {
    label: "Video & Motion",
    icon: Camera,
    tools: ["Adobe After Effects", "Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "Cinema 4D", "Blender"]
  },
  marketing: {
    label: "Marketing Tools",
    icon: Smartphone,
    tools: ["Google Analytics", "Facebook Ads Manager", "Hootsuite", "Buffer", "Mailchimp", "Hubspot"]
  }
};

const PROFICIENCY_LEVELS = ["Basic", "Intermediate", "Advanced", "Expert"];

const ToolsConfigModal = ({ isOpen, onClose, currentTools, onSave }: ToolsConfigModalProps) => {
  const { toast } = useToast();
  const [selectedTools, setSelectedTools] = useState<string[]>(currentTools);
  const [toolProficiency, setToolProficiency] = useState<Record<string, string>>({});
  const [equipment, setEquipment] = useState<string[]>([]);
  const [licenses, setLicenses] = useState<string[]>([]);
  const [newEquipment, setNewEquipment] = useState("");
  const [newLicense, setNewLicense] = useState("");

  const handleToolToggle = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(prev => prev.filter(t => t !== tool));
      setToolProficiency(prev => {
        const updated = { ...prev };
        delete updated[tool];
        return updated;
      });
    } else {
      setSelectedTools(prev => [...prev, tool]);
      setToolProficiency(prev => ({ ...prev, [tool]: "Intermediate" }));
    }
  };

  const handleProficiencyChange = (tool: string, level: string) => {
    setToolProficiency(prev => ({ ...prev, [tool]: level }));
  };

  const addEquipment = () => {
    if (newEquipment.trim() && !equipment.includes(newEquipment.trim())) {
      setEquipment(prev => [...prev, newEquipment.trim()]);
      setNewEquipment("");
    }
  };

  const addLicense = () => {
    if (newLicense.trim() && !licenses.includes(newLicense.trim())) {
      setLicenses(prev => [...prev, newLicense.trim()]);
      setNewLicense("");
    }
  };

  const removeItem = (item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter(i => i !== item));
  };

  const handleSave = () => {
    onSave(selectedTools, equipment, licenses);
    toast({
      title: "Tools & Equipment Updated",
      description: "Your professional tools and equipment have been saved.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Tools & Equipment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Software Tools */}
          <div>
            <Label className="text-base font-semibold">Professional Software</Label>
            <p className="text-sm text-gray-600 mb-4">Select the tools you're proficient with and set your skill level</p>
            
            <div className="space-y-6">
              {Object.entries(TOOL_CATEGORIES).map(([key, category]) => {
                const Icon = category.icon;
                const categoryTools = category.tools.filter(tool => selectedTools.includes(tool));
                
                return (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-lg">{category.label}</h3>
                      {categoryTools.length > 0 && (
                        <Badge variant="secondary">{categoryTools.length} selected</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.tools.map((tool) => (
                        <div key={tool} className="border rounded-md p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Checkbox
                              checked={selectedTools.includes(tool)}
                              onCheckedChange={() => handleToolToggle(tool)}
                            />
                            <Label className="flex-1 text-sm">{tool}</Label>
                          </div>
                          
                          {selectedTools.includes(tool) && (
                            <Select
                              value={toolProficiency[tool] || "Intermediate"}
                              onValueChange={(value) => handleProficiencyChange(tool, value)}
                            >
                              <SelectTrigger className="mt-2 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {PROFICIENCY_LEVELS.map((level) => (
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
                );
              })}
            </div>
          </div>

          {/* Equipment */}
          <div>
            <Label className="text-base font-semibold">Equipment & Hardware</Label>
            <p className="text-sm text-gray-600 mb-4">List your professional equipment and hardware</p>
            
            <div className="flex space-x-2 mb-4">
              <Input
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="e.g., MacBook Pro 16-inch, Canon EOS R5, Wacom Cintiq Pro"
                onKeyPress={(e) => e.key === 'Enter' && addEquipment()}
              />
              <Button onClick={addEquipment} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {equipment.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {equipment.map((item) => (
                  <Badge key={item} variant="outline" className="pr-1">
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                      onClick={() => removeItem(item, setEquipment)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Licenses */}
          <div>
            <Label className="text-base font-semibold">Software Licenses & Subscriptions</Label>
            <p className="text-sm text-gray-600 mb-4">Add your active software licenses and subscriptions</p>
            
            <div className="flex space-x-2 mb-4">
              <Input
                value={newLicense}
                onChange={(e) => setNewLicense(e.target.value)}
                placeholder="e.g., Adobe Creative Cloud (All Apps), Figma Professional"
                onKeyPress={(e) => e.key === 'Enter' && addLicense()}
              />
              <Button onClick={addLicense} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {licenses.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {licenses.map((license) => (
                  <Badge key={license} variant="outline" className="pr-1 bg-green-50 text-green-800">
                    {license}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                      onClick={() => removeItem(license, setLicenses)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {selectedTools.length > 0 && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <Label className="text-base font-semibold">Selected Tools Summary</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTools.map((tool) => (
                  <Badge key={tool} variant="default" className="bg-blue-100 text-blue-800">
                    {tool} ({toolProficiency[tool] || "Intermediate"})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={selectedTools.length === 0}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolsConfigModal;

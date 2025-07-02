
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Monitor, Smartphone, Camera, Paintbrush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolCategorySection from "./tools/ToolCategorySection";
import EquipmentSection from "./tools/EquipmentSection";
import LicenseSection from "./tools/LicenseSection";
import ToolsSummary from "./tools/ToolsSummary";

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
              {Object.entries(TOOL_CATEGORIES).map(([key, category]) => (
                <ToolCategorySection
                  key={key}
                  categoryKey={key}
                  category={category}
                  selectedTools={selectedTools}
                  toolProficiency={toolProficiency}
                  onToolToggle={handleToolToggle}
                  onProficiencyChange={handleProficiencyChange}
                  proficiencyLevels={PROFICIENCY_LEVELS}
                />
              ))}
            </div>
          </div>

          {/* Equipment */}
          <EquipmentSection 
            equipment={equipment}
            onEquipmentChange={setEquipment}
          />

          {/* Licenses */}
          <LicenseSection 
            licenses={licenses}
            onLicensesChange={setLicenses}
          />

          {/* Summary */}
          <ToolsSummary 
            selectedTools={selectedTools}
            toolProficiency={toolProficiency}
          />
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

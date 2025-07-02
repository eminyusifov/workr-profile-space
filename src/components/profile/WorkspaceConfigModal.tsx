
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import WorkArrangementSelector from "./workspace/WorkArrangementSelector";
import ServiceAreasSelector from "./workspace/ServiceAreasSelector";
import TravelPreferences from "./workspace/TravelPreferences";
import TimeZoneWorkingHours from "./workspace/TimeZoneWorkingHours";
import WorkspaceSummary from "./workspace/WorkspaceSummary";

interface WorkspaceConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences: {
    workArrangement: string;
    serviceAreas: string[];
    timeZone: string;
    workingHours: string;
  };
  onSave: (preferences: any) => void;
}

const WorkspaceConfigModal = ({ isOpen, onClose, currentPreferences, onSave }: WorkspaceConfigModalProps) => {
  const { toast } = useToast();
  const [workArrangement, setWorkArrangement] = useState(currentPreferences.workArrangement || "remote");
  const [serviceAreas, setServiceAreas] = useState<string[]>(currentPreferences.serviceAreas || []);
  const [timeZone, setTimeZone] = useState(currentPreferences.timeZone || "UTC+00:00");
  const [workingHours, setWorkingHours] = useState(currentPreferences.workingHours || "9 AM - 5 PM");
  const [travelWillingness, setTravelWillingness] = useState(false);
  const [maxTravelDistance, setMaxTravelDistance] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const handleServiceAreaToggle = (area: string) => {
    if (serviceAreas.includes(area)) {
      setServiceAreas(prev => prev.filter(a => a !== area));
    } else {
      setServiceAreas(prev => [...prev, area]);
    }
  };

  const handleSave = () => {
    const preferences = {
      workArrangement,
      serviceAreas,
      timeZone,
      workingHours,
      travelWillingness,
      maxTravelDistance,
      customLocation
    };
    
    onSave(preferences);
    toast({
      title: "Workspace Preferences Updated",
      description: "Your work arrangement and location preferences have been saved.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Workspace Preferences</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <WorkArrangementSelector 
            value={workArrangement} 
            onChange={setWorkArrangement} 
          />

          <ServiceAreasSelector 
            selectedAreas={serviceAreas} 
            onToggleArea={handleServiceAreaToggle} 
          />

          <TravelPreferences
            workArrangement={workArrangement}
            travelWillingness={travelWillingness}
            onTravelWillingnessChange={setTravelWillingness}
            maxTravelDistance={maxTravelDistance}
            onMaxTravelDistanceChange={setMaxTravelDistance}
          />

          <TimeZoneWorkingHours
            timeZone={timeZone}
            onTimeZoneChange={setTimeZone}
            workingHours={workingHours}
            onWorkingHoursChange={setWorkingHours}
          />

          <div>
            <Label className="text-base font-semibold">Primary Location (Optional)</Label>
            <Input
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="e.g., New York, NY or London, UK"
              className="mt-2"
            />
          </div>

          <WorkspaceSummary
            workArrangement={workArrangement}
            timeZone={timeZone}
            workingHours={workingHours}
            customLocation={customLocation}
            serviceAreas={serviceAreas}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={serviceAreas.length === 0}>
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceConfigModal;

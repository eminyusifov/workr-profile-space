
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Building, Plane, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const WORK_ARRANGEMENTS = [
  { value: "remote", label: "Remote Only", icon: Home, description: "Work exclusively from home or personal workspace" },
  { value: "onsite", label: "On-site Only", icon: Building, description: "Work at client's location or office" },
  { value: "hybrid", label: "Hybrid", icon: Plane, description: "Combination of remote and on-site work" },
];

const TIME_ZONES = [
  "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
  "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
  "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
  "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"
];

const WORKING_HOURS = [
  "9 AM - 5 PM", "8 AM - 4 PM", "10 AM - 6 PM", "11 AM - 7 PM",
  "Flexible hours", "24/7 availability", "Custom schedule"
];

const SERVICE_AREAS = [
  "Local (Within 50 miles)", "Regional (Within state/province)", "National", "International",
  "North America", "Europe", "Asia", "Australia", "Global"
];

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

  const selectedArrangement = WORK_ARRANGEMENTS.find(arr => arr.value === workArrangement);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Workspace Preferences</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Work Arrangement */}
          <div>
            <Label className="text-base font-semibold">Preferred Work Arrangement</Label>
            <RadioGroup value={workArrangement} onValueChange={setWorkArrangement} className="mt-3">
              {WORK_ARRANGEMENTS.map((arrangement) => {
                const Icon = arrangement.icon;
                return (
                  <div key={arrangement.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={arrangement.value} id={arrangement.value} />
                    <div className="flex items-center space-x-3 flex-1">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <div>
                        <Label htmlFor={arrangement.value} className="font-medium cursor-pointer">
                          {arrangement.label}
                        </Label>
                        <p className="text-sm text-gray-600">{arrangement.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Service Areas */}
          <div>
            <Label className="text-base font-semibold">Service Areas</Label>
            <p className="text-sm text-gray-600 mb-4">Select the geographic areas you're willing to serve</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICE_AREAS.map((area) => (
                <div key={area} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={serviceAreas.includes(area)}
                    onCheckedChange={() => handleServiceAreaToggle(area)}
                  />
                  <Label className="flex-1 cursor-pointer">{area}</Label>
                </div>
              ))}
            </div>

            {serviceAreas.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Selected Service Areas:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {serviceAreas.map((area) => (
                    <Badge key={area} variant="default" className="bg-blue-100 text-blue-800">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Travel Preferences */}
          {(workArrangement === "onsite" || workArrangement === "hybrid") && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-5 w-5 text-blue-600" />
                <Label className="text-base font-semibold">Travel Preferences</Label>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  checked={travelWillingness}
                  onCheckedChange={(checked) => setTravelWillingness(checked === true)}
                />
                <Label>Willing to travel for projects</Label>
              </div>

              {travelWillingness && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Maximum travel distance (optional)</Label>
                    <Input
                      value={maxTravelDistance}
                      onChange={(e) => setMaxTravelDistance(e.target.value)}
                      placeholder="e.g., 500 miles, 2 hours by plane"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Time Zone and Working Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Time Zone</span>
              </Label>
              <Select value={timeZone} onValueChange={setTimeZone}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIME_ZONES.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-semibold flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Working Hours</span>
              </Label>
              <Select value={workingHours} onValueChange={setWorkingHours}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WORKING_HOURS.map((hours) => (
                    <SelectItem key={hours} value={hours}>
                      {hours}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Custom Location */}
          <div>
            <Label className="text-base font-semibold">Primary Location (Optional)</Label>
            <Input
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="e.g., New York, NY or London, UK"
              className="mt-2"
            />
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <Label className="text-base font-semibold">Workspace Summary</Label>
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                {selectedArrangement && <selectedArrangement.icon className="h-4 w-4 text-blue-600" />}
                <span className="font-medium">{selectedArrangement?.label}</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Time Zone:</strong> {timeZone} | <strong>Hours:</strong> {workingHours}
              </div>
              {customLocation && (
                <div className="text-sm text-gray-600">
                  <strong>Location:</strong> {customLocation}
                </div>
              )}
              {serviceAreas.length > 0 && (
                <div className="text-sm text-gray-600">
                  <strong>Service Areas:</strong> {serviceAreas.slice(0, 3).join(", ")}
                  {serviceAreas.length > 3 && ` +${serviceAreas.length - 3} more`}
                </div>
              )}
            </div>
          </div>
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

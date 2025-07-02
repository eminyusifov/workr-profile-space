
import { Label } from "@/components/ui/label";
import { Home, Building, Plane } from "lucide-react";

const WORK_ARRANGEMENTS = [
  { value: "remote", label: "Remote Only", icon: Home },
  { value: "onsite", label: "On-site Only", icon: Building },
  { value: "hybrid", label: "Hybrid", icon: Plane },
];

interface WorkspaceSummaryProps {
  workArrangement: string;
  timeZone: string;
  workingHours: string;
  customLocation: string;
  serviceAreas: string[];
}

const WorkspaceSummary = ({
  workArrangement,
  timeZone,
  workingHours,
  customLocation,
  serviceAreas
}: WorkspaceSummaryProps) => {
  const selectedArrangement = WORK_ARRANGEMENTS.find(arr => arr.value === workArrangement);

  return (
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
  );
};

export default WorkspaceSummary;

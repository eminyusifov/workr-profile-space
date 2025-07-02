
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plane } from "lucide-react";

interface TravelPreferencesProps {
  workArrangement: string;
  travelWillingness: boolean;
  onTravelWillingnessChange: (willing: boolean) => void;
  maxTravelDistance: string;
  onMaxTravelDistanceChange: (distance: string) => void;
}

const TravelPreferences = ({
  workArrangement,
  travelWillingness,
  onTravelWillingnessChange,
  maxTravelDistance,
  onMaxTravelDistanceChange
}: TravelPreferencesProps) => {
  if (workArrangement !== "onsite" && workArrangement !== "hybrid") {
    return null;
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Plane className="h-5 w-5 text-blue-600" />
        <Label className="text-base font-semibold">Travel Preferences</Label>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          checked={travelWillingness}
          onCheckedChange={(checked) => onTravelWillingnessChange(checked === true)}
        />
        <Label>Willing to travel for projects</Label>
      </div>

      {travelWillingness && (
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Maximum travel distance (optional)</Label>
            <Input
              value={maxTravelDistance}
              onChange={(e) => onMaxTravelDistanceChange(e.target.value)}
              placeholder="e.g., 500 miles, 2 hours by plane"
              className="mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPreferences;

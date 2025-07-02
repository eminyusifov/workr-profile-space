
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Building, Plane } from "lucide-react";

const WORK_ARRANGEMENTS = [
  { value: "remote", label: "Remote Only", icon: Home, description: "Work exclusively from home or personal workspace" },
  { value: "onsite", label: "On-site Only", icon: Building, description: "Work at client's location or office" },
  { value: "hybrid", label: "Hybrid", icon: Plane, description: "Combination of remote and on-site work" },
];

interface WorkArrangementSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const WorkArrangementSelector = ({ value, onChange }: WorkArrangementSelectorProps) => {
  return (
    <div>
      <Label className="text-base font-semibold">Preferred Work Arrangement</Label>
      <RadioGroup value={value} onValueChange={onChange} className="mt-3">
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
  );
};

export default WorkArrangementSelector;

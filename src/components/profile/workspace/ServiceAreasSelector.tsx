
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const SERVICE_AREAS = [
  "Local (Within 50 miles)", "Regional (Within state/province)", "National", "International",
  "North America", "Europe", "Asia", "Australia", "Global"
];

interface ServiceAreasSelectorProps {
  selectedAreas: string[];
  onToggleArea: (area: string) => void;
}

const ServiceAreasSelector = ({ selectedAreas, onToggleArea }: ServiceAreasSelectorProps) => {
  return (
    <div>
      <Label className="text-base font-semibold">Service Areas</Label>
      <p className="text-sm text-gray-600 mb-4">Select the geographic areas you're willing to serve</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SERVICE_AREAS.map((area) => (
          <div key={area} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
            <Checkbox
              checked={selectedAreas.includes(area)}
              onCheckedChange={() => onToggleArea(area)}
            />
            <Label className="flex-1 cursor-pointer">{area}</Label>
          </div>
        ))}
      </div>

      {selectedAreas.length > 0 && (
        <div className="mt-4">
          <Label className="text-sm font-medium">Selected Service Areas:</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedAreas.map((area) => (
              <Badge key={area} variant="default" className="bg-blue-100 text-blue-800">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceAreasSelector;

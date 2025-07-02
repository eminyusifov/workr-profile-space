
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface EquipmentSectionProps {
  equipment: string[];
  onEquipmentChange: (equipment: string[]) => void;
}

const EquipmentSection = ({ equipment, onEquipmentChange }: EquipmentSectionProps) => {
  const [newEquipment, setNewEquipment] = useState("");

  const addEquipment = () => {
    if (newEquipment.trim() && !equipment.includes(newEquipment.trim())) {
      onEquipmentChange([...equipment, newEquipment.trim()]);
      setNewEquipment("");
    }
  };

  const removeEquipment = (item: string) => {
    onEquipmentChange(equipment.filter(i => i !== item));
  };

  return (
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
                onClick={() => removeEquipment(item)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentSection;


import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ToolCategorySectionProps {
  categoryKey: string;
  category: {
    label: string;
    icon: LucideIcon;
    tools: string[];
  };
  selectedTools: string[];
  toolProficiency: Record<string, string>;
  onToolToggle: (tool: string) => void;
  onProficiencyChange: (tool: string, level: string) => void;
  proficiencyLevels: string[];
}

const ToolCategorySection = ({
  categoryKey,
  category,
  selectedTools,
  toolProficiency,
  onToolToggle,
  onProficiencyChange,
  proficiencyLevels
}: ToolCategorySectionProps) => {
  const Icon = category.icon;
  const categoryTools = category.tools.filter(tool => selectedTools.includes(tool));

  return (
    <div key={categoryKey} className="border rounded-lg p-4">
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
                onCheckedChange={() => onToolToggle(tool)}
              />
              <Label className="flex-1 text-sm">{tool}</Label>
            </div>
            
            {selectedTools.includes(tool) && (
              <Select
                value={toolProficiency[tool] || "Intermediate"}
                onValueChange={(value) => onProficiencyChange(tool, value)}
              >
                <SelectTrigger className="mt-2 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((level) => (
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
};

export default ToolCategorySection;

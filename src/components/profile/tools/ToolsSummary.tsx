
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface ToolsSummaryProps {
  selectedTools: string[];
  toolProficiency: Record<string, string>;
}

const ToolsSummary = ({ selectedTools, toolProficiency }: ToolsSummaryProps) => {
  if (selectedTools.length === 0) {
    return null;
  }

  return (
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
  );
};

export default ToolsSummary;

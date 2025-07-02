
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface LanguageAddSectionProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  onAddLanguage: () => void;
  availableLanguages: string[];
}

const PROFICIENCY_LEVELS = [
  { value: "1", label: "Beginner (A1)", description: "Basic words and phrases" },
  { value: "2", label: "Elementary (A2)", description: "Simple conversations" },
  { value: "3", label: "Intermediate (B1)", description: "General topics and work" },
  { value: "4", label: "Upper Intermediate (B2)", description: "Complex topics and professional use" },
  { value: "5", label: "Advanced (C1)", description: "Fluent and precise" },
  { value: "6", label: "Native/Mastery (C2)", description: "Native speaker level" }
];

const LanguageAddSection = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedLevel,
  setSelectedLevel,
  onAddLanguage,
  availableLanguages
}: LanguageAddSectionProps) => {
  return (
    <div className="border rounded-lg p-4">
      <Label className="text-base font-semibold">Add Language</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PROFICIENCY_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={onAddLanguage} 
          disabled={!selectedLanguage}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default LanguageAddSection;

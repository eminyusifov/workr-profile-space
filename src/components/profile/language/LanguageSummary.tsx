
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface Language {
  language: string;
  level: string;
  isPrimary?: boolean;
}

interface LanguageSummaryProps {
  languages: Language[];
}

const PROFICIENCY_LEVELS = [
  { value: "1", label: "Beginner (A1)" },
  { value: "2", label: "Elementary (A2)" },
  { value: "3", label: "Intermediate (B1)" },
  { value: "4", label: "Upper Intermediate (B2)" },
  { value: "5", label: "Advanced (C1)" },
  { value: "6", label: "Native/Mastery (C2)" }
];

const LanguageSummary = ({ languages }: LanguageSummaryProps) => {
  if (languages.length === 0) {
    return null;
  }

  const getLevelLabel = (level: string) => {
    return PROFICIENCY_LEVELS.find(pl => pl.value === level)?.label || level;
  };

  return (
    <div className="border rounded-lg p-4 bg-blue-50">
      <Label className="text-base font-semibold">Language Summary</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {languages.map((lang) => (
          <Badge 
            key={lang.language} 
            variant={lang.isPrimary ? "default" : "secondary"}
            className={lang.isPrimary ? "bg-blue-600" : ""}
          >
            {lang.language} - {getLevelLabel(lang.level)}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default LanguageSummary;

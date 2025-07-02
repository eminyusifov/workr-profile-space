
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface Language {
  language: string;
  level: string;
  isPrimary?: boolean;
}

interface LanguageListSectionProps {
  languages: Language[];
  onRemoveLanguage: (language: string) => void;
  onSetPrimaryLanguage: (language: string) => void;
  onUpdateLanguageLevel: (language: string, level: string) => void;
}

const PROFICIENCY_LEVELS = [
  { value: "1", label: "Beginner (A1)", description: "Basic words and phrases" },
  { value: "2", label: "Elementary (A2)", description: "Simple conversations" },
  { value: "3", label: "Intermediate (B1)", description: "General topics and work" },
  { value: "4", label: "Upper Intermediate (B2)", description: "Complex topics and professional use" },
  { value: "5", label: "Advanced (C1)", description: "Fluent and precise" },
  { value: "6", label: "Native/Mastery (C2)", description: "Native speaker level" }
];

const LanguageListSection = ({
  languages,
  onRemoveLanguage,
  onSetPrimaryLanguage,
  onUpdateLanguageLevel
}: LanguageListSectionProps) => {
  if (languages.length === 0) {
    return null;
  }

  return (
    <div>
      <Label className="text-base font-semibold">Your Languages</Label>
      <div className="space-y-3 mt-3">
        {languages.map((lang) => (
          <div key={lang.language} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{lang.language}</span>
                {lang.isPrimary && (
                  <Badge variant="default" className="bg-blue-600">
                    Primary
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveLanguage(lang.language)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">Proficiency Level</Label>
                <Select 
                  value={lang.level} 
                  onValueChange={(value) => onUpdateLanguageLevel(lang.language, value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROFICIENCY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs text-gray-500">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {!lang.isPrimary && languages.length > 1 && (
                <div>
                  <Label className="text-sm font-medium">Set as Primary</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSetPrimaryLanguage(lang.language)}
                    className="mt-1 w-full"
                  >
                    Make Primary
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageListSection;

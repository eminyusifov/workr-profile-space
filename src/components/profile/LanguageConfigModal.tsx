import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Plus, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LanguageConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguages: { language: string; level: string; isPrimary?: boolean; }[];
  onSave: (languages: { language: string; level: string; isPrimary?: boolean; }[], communicationPreference: string) => void;
}

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian",
  "Chinese (Mandarin)", "Japanese", "Korean", "Arabic", "Hindi", "Dutch",
  "Swedish", "Norwegian", "Danish", "Finnish", "Polish", "Turkish", "Greek"
];

const PROFICIENCY_LEVELS = [
  { value: "1", label: "Beginner (A1)", description: "Basic words and phrases" },
  { value: "2", label: "Elementary (A2)", description: "Simple conversations" },
  { value: "3", label: "Intermediate (B1)", description: "General topics and work" },
  { value: "4", label: "Upper Intermediate (B2)", description: "Complex topics and professional use" },
  { value: "5", label: "Advanced (C1)", description: "Fluent and precise" },
  { value: "6", label: "Native/Mastery (C2)", description: "Native speaker level" }
];

const COMMUNICATION_PREFERENCES = [
  { value: "english", label: "English (Primary)", description: "Prefer all communications in English" },
  { value: "native", label: "Native Language", description: "Prefer communication in my native language when possible" },
  { value: "client", label: "Client's Language", description: "Adapt to client's preferred language" },
  { value: "flexible", label: "Flexible", description: "Comfortable with multiple languages" }
];

const LanguageConfigModal = ({ isOpen, onClose, currentLanguages, onSave }: LanguageConfigModalProps) => {
  const { toast } = useToast();
  const [languages, setLanguages] = useState(currentLanguages);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("3");
  const [communicationPreference, setCommunicationPreference] = useState("english");

  const addLanguage = () => {
    if (selectedLanguage && !languages.find(l => l.language === selectedLanguage)) {
      const newLanguage = {
        language: selectedLanguage,
        level: selectedLevel,
        isPrimary: languages.length === 0
      };
      setLanguages(prev => [...prev, newLanguage]);
      setSelectedLanguage("");
      setSelectedLevel("3");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setLanguages(prev => {
      const updated = prev.filter(l => l.language !== languageToRemove);
      // If we removed the primary language, make the first one primary
      if (updated.length > 0 && !updated.find(l => l.isPrimary)) {
        updated[0].isPrimary = true;
      }
      return updated;
    });
  };

  const setPrimaryLanguage = (language: string) => {
    setLanguages(prev => prev.map(l => ({
      ...l,
      isPrimary: l.language === language
    })));
  };

  const updateLanguageLevel = (language: string, level: string) => {
    setLanguages(prev => prev.map(l => 
      l.language === language ? { ...l, level } : l
    ));
  };

  const availableLanguages = LANGUAGES.filter(lang => 
    !languages.find(l => l.language === lang)
  );

  const handleSave = () => {
    onSave(languages, communicationPreference);
    toast({
      title: "Languages Updated",
      description: "Your language preferences have been saved successfully.",
    });
    onClose();
  };

  const getLevelLabel = (level: string) => {
    return PROFICIENCY_LEVELS.find(pl => pl.value === level)?.label || level;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Configure Languages</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add New Language */}
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
                onClick={addLanguage} 
                disabled={!selectedLanguage}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Current Languages */}
          {languages.length > 0 && (
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
                        onClick={() => removeLanguage(lang.language)}
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
                          onValueChange={(value) => updateLanguageLevel(lang.language, value)}
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
                            onClick={() => setPrimaryLanguage(lang.language)}
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
          )}

          {/* Communication Preferences */}
          <div>
            <Label className="text-base font-semibold">Communication Preference</Label>
            <p className="text-sm text-gray-600 mb-4">How would you prefer to communicate with clients?</p>
            
            <RadioGroup value={communicationPreference} onValueChange={setCommunicationPreference}>
              {COMMUNICATION_PREFERENCES.map((pref) => (
                <div key={pref.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={pref.value} id={pref.value} />
                  <div className="flex-1">
                    <Label htmlFor={pref.value} className="font-medium cursor-pointer">
                      {pref.label}
                    </Label>
                    <p className="text-sm text-gray-600">{pref.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Language Summary */}
          {languages.length > 0 && (
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
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={languages.length === 0}>
            Save Languages
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageConfigModal;


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LanguageAddSection from "./language/LanguageAddSection";
import LanguageListSection from "./language/LanguageListSection";
import CommunicationPreferences from "./language/CommunicationPreferences";
import LanguageSummary from "./language/LanguageSummary";

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
          <LanguageAddSection
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            onAddLanguage={addLanguage}
            availableLanguages={availableLanguages}
          />

          <LanguageListSection
            languages={languages}
            onRemoveLanguage={removeLanguage}
            onSetPrimaryLanguage={setPrimaryLanguage}
            onUpdateLanguageLevel={updateLanguageLevel}
          />

          <CommunicationPreferences
            communicationPreference={communicationPreference}
            onCommunicationPreferenceChange={setCommunicationPreference}
          />

          <LanguageSummary languages={languages} />
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


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CommunicationPreferencesProps {
  communicationPreference: string;
  onCommunicationPreferenceChange: (preference: string) => void;
}

const COMMUNICATION_PREFERENCES = [
  { value: "english", label: "English (Primary)", description: "Prefer all communications in English" },
  { value: "native", label: "Native Language", description: "Prefer communication in my native language when possible" },
  { value: "client", label: "Client's Language", description: "Adapt to client's preferred language" },
  { value: "flexible", label: "Flexible", description: "Comfortable with multiple languages" }
];

const CommunicationPreferences = ({
  communicationPreference,
  onCommunicationPreferenceChange
}: CommunicationPreferencesProps) => {
  return (
    <div>
      <Label className="text-base font-semibold">Communication Preference</Label>
      <p className="text-sm text-gray-600 mb-4">How would you prefer to communicate with clients?</p>
      
      <RadioGroup value={communicationPreference} onValueChange={onCommunicationPreferenceChange}>
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
  );
};

export default CommunicationPreferences;

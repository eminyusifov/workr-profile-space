
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface LicenseSectionProps {
  licenses: string[];
  onLicensesChange: (licenses: string[]) => void;
}

const LicenseSection = ({ licenses, onLicensesChange }: LicenseSectionProps) => {
  const [newLicense, setNewLicense] = useState("");

  const addLicense = () => {
    if (newLicense.trim() && !licenses.includes(newLicense.trim())) {
      onLicensesChange([...licenses, newLicense.trim()]);
      setNewLicense("");
    }
  };

  const removeLicense = (license: string) => {
    onLicensesChange(licenses.filter(l => l !== license));
  };

  return (
    <div>
      <Label className="text-base font-semibold">Software Licenses & Subscriptions</Label>
      <p className="text-sm text-gray-600 mb-4">Add your active software licenses and subscriptions</p>
      
      <div className="flex space-x-2 mb-4">
        <Input
          value={newLicense}
          onChange={(e) => setNewLicense(e.target.value)}
          placeholder="e.g., Adobe Creative Cloud (All Apps), Figma Professional"
          onKeyPress={(e) => e.key === 'Enter' && addLicense()}
        />
        <Button onClick={addLicense} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {licenses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {licenses.map((license) => (
            <Badge key={license} variant="outline" className="pr-1 bg-green-50 text-green-800">
              {license}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                onClick={() => removeLicense(license)}
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

export default LicenseSection;

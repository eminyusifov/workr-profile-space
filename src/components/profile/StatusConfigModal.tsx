
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Circle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface StatusConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onSave: (status: string, message: string, autoUpdate: boolean, availableUntil?: Date) => void;
}

const STATUS_OPTIONS = [
  { value: "available", label: "Available", color: "bg-green-500", description: "Ready to take on new projects" },
  { value: "busy", label: "Busy", color: "bg-yellow-500", description: "Currently working but may consider urgent projects" },
  { value: "offline", label: "Offline", color: "bg-red-500", description: "Not available for new projects" },
  { value: "vacation", label: "On Vacation", color: "bg-purple-500", description: "Away and not checking messages regularly" }
];

const StatusConfigModal = ({ isOpen, onClose, currentStatus, onSave }: StatusConfigModalProps) => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [statusMessage, setStatusMessage] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [availableUntil, setAvailableUntil] = useState<Date | undefined>();

  const handleSave = () => {
    onSave(selectedStatus, statusMessage, autoUpdate, availableUntil);
    toast({
      title: "Status Updated",
      description: "Your availability status has been updated successfully.",
    });
    onClose();
  };

  const selectedOption = STATUS_OPTIONS.find(option => option.value === selectedStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Availability Status</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Selection */}
          <div>
            <Label className="text-base font-semibold">Current Status</Label>
            <RadioGroup value={selectedStatus} onValueChange={setSelectedStatus} className="mt-3">
              {STATUS_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-3 h-3 rounded-full ${option.color}`} />
                    <div>
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Status Message */}
          <div>
            <Label className="text-base font-semibold">Status Message (Optional)</Label>
            <p className="text-sm text-gray-600 mb-2">Add a custom message to explain your current situation</p>
            <Textarea
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              placeholder="e.g., Currently fully booked until March. Will respond to urgent inquiries within 48 hours."
              className="h-20"
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {statusMessage.length}/200
            </div>
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <Label className="text-base font-semibold">Preview</Label>
            <div className="flex items-center space-x-3 mt-2">
              <div className={`w-3 h-3 rounded-full ${selectedOption?.color}`} />
              <span className="font-medium">{selectedOption?.label}</span>
            </div>
            {statusMessage && (
              <p className="text-sm text-gray-600 mt-2">{statusMessage}</p>
            )}
          </div>

          {/* Auto Status Update */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Auto-update status</Label>
                <p className="text-sm text-gray-600">Automatically change status based on schedule</p>
              </div>
              <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
            </div>

            {autoUpdate && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Available until</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-2"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {availableUntil ? format(availableUntil, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={availableUntil}
                      onSelect={setAvailableUntil}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusConfigModal;

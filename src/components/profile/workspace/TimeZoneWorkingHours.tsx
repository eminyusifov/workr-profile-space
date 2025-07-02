
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock } from "lucide-react";

const TIME_ZONES = [
  "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
  "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
  "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
  "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"
];

const WORKING_HOURS = [
  "9 AM - 5 PM", "8 AM - 4 PM", "10 AM - 6 PM", "11 AM - 7 PM",
  "Flexible hours", "24/7 availability", "Custom schedule"
];

interface TimeZoneWorkingHoursProps {
  timeZone: string;
  onTimeZoneChange: (timeZone: string) => void;
  workingHours: string;
  onWorkingHoursChange: (hours: string) => void;
}

const TimeZoneWorkingHours = ({
  timeZone,
  onTimeZoneChange,
  workingHours,
  onWorkingHoursChange
}: TimeZoneWorkingHoursProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-base font-semibold flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>Time Zone</span>
        </Label>
        <Select value={timeZone} onValueChange={onTimeZoneChange}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIME_ZONES.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Working Hours</span>
        </Label>
        <Select value={workingHours} onValueChange={onWorkingHoursChange}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {WORKING_HOURS.map((hours) => (
              <SelectItem key={hours} value={hours}>
                {hours}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeZoneWorkingHours;

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, DollarSign, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Specialist {
  id: number;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: string;
  availability: string;
  skills: string[];
  experience: string;
  responseTime: string;
  completedProjects: number;
  avatar: string;
}

interface SpecialistComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  specialists: Specialist[];
  onContactSpecialist: (specialist: Specialist) => void;
}

const SpecialistComparison = ({ isOpen, onClose, specialists, onContactSpecialist }: SpecialistComparisonProps) => {
  const { toast } = useToast();

  const comparisonCategories = [
    { key: 'rating', label: 'Rating', icon: Star },
    { key: 'experience', label: 'Experience', icon: Clock },
    { key: 'hourlyRate', label: 'Hourly Rate', icon: DollarSign },
    { key: 'completedProjects', label: 'Projects', icon: null },
    { key: 'responseTime', label: 'Response Time', icon: Clock },
    { key: 'location', label: 'Location', icon: MapPin },
  ];

  const handleContact = (specialist: Specialist) => {
    onContactSpecialist(specialist);
    toast({
      title: "Opening Message",
      description: `Starting conversation with ${specialist.name}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Specialists</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 w-48">Specialist</th>
                {specialists.map((specialist) => (
                  <th key={specialist.id} className="text-center p-4 min-w-64">
                    <div className="flex flex-col items-center space-y-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={specialist.avatar} />
                        <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{specialist.name}</h3>
                        <p className="text-sm text-gray-600">{specialist.title}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleContact(specialist)}
                        className="w-full"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((category) => (
                <tr key={category.key} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    <div className="flex items-center space-x-2">
                      {category.icon && <category.icon className="h-4 w-4" />}
                      <span>{category.label}</span>
                    </div>
                  </td>
                  {specialists.map((specialist) => (
                    <td key={specialist.id} className="p-4 text-center">
                      {category.key === 'rating' && (
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{specialist.rating}</span>
                          <span className="text-sm text-gray-500">({specialist.reviews})</span>
                        </div>
                      )}
                      {category.key === 'availability' && (
                        <Badge className={specialist.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {specialist.availability}
                        </Badge>
                      )}
                      {category.key !== 'rating' && category.key !== 'availability' && (
                        <span className="text-gray-700">
                          {specialist[category.key as keyof Specialist]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Skills Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">Skills</td>
                {specialists.map((specialist) => (
                  <td key={specialist.id} className="p-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {specialist.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {specialist.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{specialist.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialistComparison;
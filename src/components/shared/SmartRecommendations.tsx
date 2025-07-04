import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, TrendingUp, Zap, Target, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Specialist {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  hourlyRate: string;
  skills: string[];
  avatar: string;
  matchScore: number;
  matchReasons: string[];
  trending: boolean;
  availability: string;
}

interface SmartRecommendationsProps {
  userPreferences?: {
    budget?: string;
    skills?: string[];
    projectType?: string;
    timeline?: string;
  };
  searchHistory?: string[];
  previousHires?: number[];
}

const SmartRecommendations = ({ 
  userPreferences = {}, 
  searchHistory = [], 
  previousHires = [] 
}: SmartRecommendationsProps) => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock AI-powered recommendations
  useEffect(() => {
    const generateRecommendations = () => {
      const mockRecommendations: Specialist[] = [
        {
          id: 1,
          name: "Jennifer Liu",
          title: "Senior UX Designer",
          rating: 4.9,
          reviews: 156,
          hourlyRate: "$95/hour",
          skills: ["UX Design", "Prototyping", "User Research", "Figma"],
          avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
          matchScore: 95,
          matchReasons: ["Matches your budget range", "Expert in required skills", "High client satisfaction"],
          trending: true,
          availability: "Available"
        },
        {
          id: 2,
          name: "Robert Chen",
          title: "Full-Stack Developer",
          rating: 4.8,
          reviews: 203,
          hourlyRate: "$85/hour",
          skills: ["React", "Node.js", "MongoDB", "TypeScript"],
          avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
          matchScore: 92,
          matchReasons: ["Similar to your previous hires", "Fast delivery time", "Excellent communication"],
          trending: false,
          availability: "Available"
        },
        {
          id: 3,
          name: "Maria Rodriguez",
          title: "Brand Designer",
          rating: 4.9,
          reviews: 178,
          hourlyRate: "$75/hour",
          skills: ["Brand Identity", "Logo Design", "Illustration", "Adobe Creative Suite"],
          avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
          matchScore: 88,
          matchReasons: ["Trending in your industry", "Perfect portfolio match", "Available immediately"],
          trending: true,
          availability: "Available"
        },
        {
          id: 4,
          name: "David Kim",
          title: "Motion Graphics Designer",
          rating: 4.7,
          reviews: 134,
          hourlyRate: "$90/hour",
          skills: ["After Effects", "Cinema 4D", "Motion Graphics", "Video Editing"],
          avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
          matchScore: 85,
          matchReasons: ["Emerging skill demand", "Competitive pricing", "Quick turnaround"],
          trending: false,
          availability: "Busy"
        }
      ];

      // Simulate AI processing delay
      setTimeout(() => {
        setRecommendations(mockRecommendations);
        setLoading(false);
      }, 1500);
    };

    generateRecommendations();
  }, [userPreferences, searchHistory, previousHires]);

  const handleViewProfile = (specialist: Specialist) => {
    toast({
      title: "Opening Profile",
      description: `Viewing ${specialist.name}'s profile`,
    });
  };

  const handleContactSpecialist = (specialist: Specialist) => {
    toast({
      title: "Starting Conversation",
      description: `Opening chat with ${specialist.name}`,
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <span>AI-Powered Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-500" />
          <span>AI-Powered Recommendations</span>
          <Badge className="bg-purple-100 text-purple-800">Smart Match</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recommendations.map((specialist) => (
            <div key={specialist.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={specialist.avatar} />
                    <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {specialist.trending && (
                    <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full p-1">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{specialist.name}</h4>
                      <p className="text-sm text-gray-600">{specialist.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          {specialist.matchScore}% match
                        </span>
                      </div>
                      <Badge className={specialist.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {specialist.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{specialist.rating}</span>
                      <span className="text-sm text-gray-500">({specialist.reviews})</span>
                    </div>
                    <span className="text-sm font-medium">{specialist.hourlyRate}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {specialist.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {specialist.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{specialist.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-purple-500" />
                      Why this match?
                    </h5>
                    <div className="space-y-1">
                      {specialist.matchReasons.map((reason, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleViewProfile(specialist)}
                      className="flex-1"
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleContactSpecialist(specialist)}
                      className="flex-1"
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-4 border-t">
            <Button variant="outline" className="w-full">
              View More Recommendations
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
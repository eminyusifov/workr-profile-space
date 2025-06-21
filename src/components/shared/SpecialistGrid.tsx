
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Specialist {
  id: number;
  name: string;
  username: string;
  skills: string;
  rating: number;
  reviews: number;
  status: string;
  price: string;
  avatar: string;
  isNew?: boolean;
  languages?: string;
}

interface SpecialistGridProps {
  specialists: Specialist[];
  title?: string;
  showCount?: boolean;
}

const SpecialistGrid = ({ specialists, title = "Specialists", showCount = true }: SpecialistGridProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {title} {showCount && <span className="text-blue-600">({specialists.length})</span>}
            </h3>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialists.map((specialist) => (
            <Link key={specialist.id} to={`/specialist/${specialist.id}`}>
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={specialist.avatar} />
                        <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {specialist.name}
                        </h4>
                        <p className="text-sm text-gray-500">{specialist.username}</p>
                      </div>
                    </div>
                    {specialist.isNew && (
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        new!
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Skills</p>
                      <p className="text-sm font-medium text-gray-900">{specialist.skills}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(specialist.rating)
                                ? "fill-blue-500 text-blue-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">
                          ({specialist.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          specialist.status === "Free" ? "bg-green-500" : "bg-yellow-500"
                        }`} />
                        <span className="text-sm text-gray-600">{specialist.status}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-1 hover:bg-red-50 hover:text-red-600">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">From <span className="font-semibold text-gray-900">{specialist.price}</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistGrid;

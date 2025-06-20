
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Supplier {
  id: number;
  name: string;
  username: string;
  rating: number;
  reviews: number;
  category: string;
  price: string;
  status: string;
  workStatus: string;
  languages: string[];
  tools: string[];
  avatar: string;
  completedProjects: number;
  responseTime: string;
  description: string;
  verified: boolean;
}

interface SupplierCardProps {
  supplier: Supplier;
  index?: number;
  showRanking?: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const SupplierCard = ({ supplier, index, showRanking, isFavorite, onToggleFavorite }: SupplierCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        {showRanking && index !== undefined && (
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-lg font-bold">
              #{index + 1}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{supplier.rating}</span>
            </div>
          </div>
        )}
        
        <div className="flex items-start space-x-4 mb-4">
          <Link to={`/specialist/${supplier.id}`}>
            <Avatar className="h-16 w-16 ring-2 ring-white shadow-lg">
              <AvatarImage src={supplier.avatar} />
              <AvatarFallback>{supplier.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link to={`/specialist/${supplier.id}`}>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {supplier.name}
                </h3>
                {supplier.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    ✓ Verified
                  </Badge>
                )}
              </div>
            </Link>
            <p className="text-gray-600 text-sm mb-2">{supplier.username}</p>
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">{supplier.description}</p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(supplier.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {supplier.rating} ({supplier.reviews} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${
              supplier.status === "Available" ? "bg-green-500" : "bg-yellow-500"
            }`} />
            <span className="text-xs text-gray-600">{supplier.status}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{supplier.category}</Badge>
            <Badge variant="secondary" className="text-xs">{supplier.workStatus}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">{supplier.completedProjects}</span> projects
            </div>
            <div>
              <span className="font-medium">{supplier.responseTime}</span> response
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Languages:</p>
            <div className="flex space-x-1">
              {supplier.languages.map(lang => (
                <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Tools:</p>
            <div className="flex flex-wrap gap-1">
              {supplier.tools.map(tool => (
                <Badge key={tool} variant="outline" className="text-xs">{tool}</Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t">
            <span className="font-semibold text-gray-900">{supplier.price}</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onToggleFavorite(supplier.id)}
                className={isFavorite ? "text-red-500 border-red-200" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Link to={`/specialist/${supplier.id}`}>
                <Button size="sm" className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierCard;

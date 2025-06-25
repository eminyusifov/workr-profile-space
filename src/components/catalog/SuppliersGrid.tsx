
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import MessageComposer from "@/components/messages/MessageComposer";

interface Supplier {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: string;
  category: string;
  location: string;
  image: string;
  tags: string[];
}

interface SuppliersGridProps {
  suppliers: Supplier[];
}

const SuppliersGrid = ({ suppliers }: SuppliersGridProps) => {
  const [isMessageComposerOpen, setIsMessageComposerOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const handleMessageClick = (supplier: Supplier) => {
    console.log("Opening message with supplier:", supplier.id);
    setSelectedSupplier(supplier);
    setIsMessageComposerOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={supplier.image} 
                      alt={supplier.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <Link to={`/specialist/${supplier.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                          {supplier.name}
                        </h3>
                      </Link>
                      <Badge variant="outline">{supplier.category}</Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {supplier.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-3">
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
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {supplier.rating} ({supplier.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{supplier.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {supplier.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {supplier.price}
                      </span>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMessageClick(supplier)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Link to={`/specialist/${supplier.id}`}>
                          <Button size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Suppliers
          </Button>
        </div>
      </div>

      <MessageComposer
        isOpen={isMessageComposerOpen}
        onClose={() => setIsMessageComposerOpen(false)}
        recipientName={selectedSupplier?.name}
        recipientId={selectedSupplier?.id}
      />
    </>
  );
};

export default SuppliersGrid;

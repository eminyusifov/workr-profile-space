
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface PortfolioWork {
  id: number;
  title: string;
  category: string;
  likes: number;
}

interface PortfolioTabProps {
  portfolio: PortfolioWork[];
}

const PortfolioTab = ({ portfolio }: PortfolioTabProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">My Work</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((work) => (
          <Card key={work.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-sm opacity-90 mb-2">{work.category.toUpperCase()}</div>
                  <div className="text-lg font-bold">PROJECT</div>
                  <div className="text-xs opacity-75 mt-2">{work.title}</div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">{work.title}</h4>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{work.category}</Badge>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{work.likes}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTab;


import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import WorkModal from "./WorkModal";

interface PortfolioWork {
  id: number;
  title: string;
  category: string;
  likes: number;
  description?: string;
  tags?: string[];
}

interface PortfolioTabProps {
  portfolio: PortfolioWork[];
}

const PortfolioTab = ({ portfolio }: PortfolioTabProps) => {
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (workId: number) => {
    setFavorites(prev => 
      prev.includes(workId) 
        ? prev.filter(id => id !== workId)
        : [...prev, workId]
    );
  };

  const handleWorkClick = (work: PortfolioWork) => {
    const enhancedWork = {
      ...work,
      description: work.description || `This is a detailed description of ${work.title}. It showcases advanced design techniques and modern approaches to ${work.category.toLowerCase()}.`,
      tags: work.tags || ["Design", "Creative", "Modern"],
      author: {
        name: "John Smith",
        avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
        rating: 4.9
      }
    };
    setSelectedWork(enhancedWork);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">My Work</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((work) => (
          <Card key={work.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
            <CardContent className="p-0">
              <div 
                className="aspect-[4/3] bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center"
                onClick={() => handleWorkClick(work)}
              >
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
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{work.likes}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(work.id);
                      }}
                      className="p-1"
                    >
                      <Star className={`h-4 w-4 ${favorites.includes(work.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedWork && (
        <WorkModal
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
        />
      )}
    </div>
  );
};

export default PortfolioTab;

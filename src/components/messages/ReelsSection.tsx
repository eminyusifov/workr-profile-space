
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReelModal from "./ReelModal";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface Reel {
  id: number;
  user: { name: string; username: string; avatar: string };
  thumbnail: string;
  title: string;
}

interface ReelsSectionProps {
  reels: Reel[];
}

const ReelsSection = ({ reels }: ReelsSectionProps) => {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReelClick = (reel: Reel) => {
    console.log("Opening reel:", reel.title);
    setSelectedReel(reel);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (selectedReel) {
      const currentIndex = reels.findIndex(r => r.id === selectedReel.id);
      const nextIndex = currentIndex + 1;
      if (nextIndex < reels.length) {
        setSelectedReel(reels[nextIndex]);
      }
    }
  };

  const handlePrevious = () => {
    if (selectedReel) {
      const currentIndex = reels.findIndex(r => r.id === selectedReel.id);
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        setSelectedReel(reels[prevIndex]);
      }
    }
  };

  return (
    <>
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Latest Work</h3>
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reels.map((reel) => (
                <CarouselItem key={reel.id} className="pl-2 md:pl-4 basis-auto">
                  <div className="flex-shrink-0 w-24">
                    <div className="relative mb-2">
                      <button
                        onClick={() => handleReelClick(reel)}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 p-0.5 hover:scale-105 transition-transform"
                      >
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-1">
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center relative overflow-hidden">
                            <img 
                              src={reel.thumbnail} 
                              alt={reel.title}
                              className="w-full h-full object-cover rounded-full"
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <Link to={`/specialist/${reel.user.username.slice(1)}`}>
                      <p className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium truncate hover:text-blue-600 dark:hover:text-blue-400">
                        {reel.user.name.split(' ')[0]}
                      </p>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      <ReelModal 
        reel={selectedReel}
        reels={reels}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  );
};

export default ReelsSection;

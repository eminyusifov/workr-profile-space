
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReelModal from "./ReelModal";

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

  return (
    <>
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Work</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {reels.map((reel) => (
              <div key={reel.id} className="flex-shrink-0 w-24">
                <div className="relative mb-2">
                  <button
                    onClick={() => handleReelClick(reel)}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 p-0.5 hover:scale-105 transition-transform"
                  >
                    <div className="w-full h-full rounded-full bg-white p-1">
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
                  <p className="text-xs text-center text-gray-700 font-medium truncate hover:text-blue-600">
                    {reel.user.name.split(' ')[0]}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReelModal 
        reel={selectedReel}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ReelsSection;


import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Heart, MessageCircle, Share, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Reel {
  id: number;
  user: { name: string; username: string; avatar: string };
  thumbnail: string;
  title: string;
}

interface ReelModalProps {
  reel: Reel | null;
  reels: Reel[];
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const ReelModal = ({ reel, reels, isOpen, onClose, onNext, onPrevious }: ReelModalProps) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!reel) return null;

  const currentIndex = reels.findIndex(r => r.id === reel.id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === reels.length - 1;

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log(`${isLiked ? 'Unliked' : 'Liked'} reel:`, reel.title);
  };

  const handleComment = () => {
    console.log("Comment on reel:", reel.title);
  };

  const handleShare = () => {
    console.log("Share reel:", reel.title);
  };

  const handleNext = () => {
    if (!isLast && onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (!isFirst && onPrevious) {
      onPrevious();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 bg-black">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Navigation arrows */}
          {!isFirst && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {!isLast && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
          
          <div className="aspect-[9/16] bg-black flex items-center justify-center relative">
            <img 
              src={reel.thumbnail} 
              alt={reel.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
                <Play className="h-12 w-12" />
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={reel.user.avatar} />
                <AvatarFallback>{reel.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white font-semibold">{reel.user.name}</h3>
                <p className="text-gray-300 text-sm">{reel.user.username}</p>
              </div>
            </div>
            
            <p className="text-white mb-4">{reel.title}</p>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`text-white hover:bg-white/20 ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={handleComment}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={handleShare}
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReelModal;

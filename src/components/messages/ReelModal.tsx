
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Heart, MessageCircle, Share, X } from "lucide-react";
import { useState } from "react";

interface Reel {
  id: number;
  user: { name: string; username: string; avatar: string };
  thumbnail: string;
  title: string;
}

interface ReelModalProps {
  reel: Reel | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReelModal = ({ reel, isOpen, onClose }: ReelModalProps) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!reel) return null;

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
                onClick={() => setIsLiked(!isLiked)}
                className={`text-white hover:bg-white/20 ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
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

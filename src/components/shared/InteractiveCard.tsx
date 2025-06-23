
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onFavorite?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  isFavorited?: boolean;
  isBookmarked?: boolean;
}

const InteractiveCard = ({ 
  children, 
  className = "", 
  onFavorite,
  onBookmark, 
  onShare,
  isFavorited = false,
  isBookmarked = false 
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
      
      {/* Hover overlay with actions */}
      <motion.div
        className="absolute inset-0 bg-black/10 dark:bg-white/10 opacity-0 rounded-2xl pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Action buttons */}
      <motion.div
        className="absolute top-3 right-3 flex space-x-1 opacity-0 pointer-events-none"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8 
        }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {onFavorite && (
          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 pointer-events-auto ${
              isFavorited ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        )}
        
        {onBookmark && (
          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 pointer-events-auto ${
              isBookmarked ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        )}
        
        {onShare && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 pointer-events-auto text-gray-600 dark:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCard;

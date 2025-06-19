
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Send, Star } from "lucide-react";
import { useState } from "react";

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  work: {
    id: number;
    title: string;
    category: string;
    likes: number;
    description?: string;
    tags?: string[];
    author: {
      name: string;
      avatar: string;
      rating: number;
    };
  };
}

const WorkModal = ({ isOpen, onClose, work }: WorkModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const comments = [
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      comment: "Amazing work! Love the color palette.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: { name: "Alex Rodriguez", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      comment: "This is exactly what I was looking for my project!",
      timestamp: "1 day ago"
    }
  ];

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{work.title}</span>
            <div className="flex items-center space-x-2">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{work.likes + (isLiked ? 1 : 0)}</span>
              </Button>
              <Button
                variant={isFavorited ? "default" : "outline"}
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Star className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Author Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={work.author.avatar} />
              <AvatarFallback>{work.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{work.author.name}</h3>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(work.author.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">{work.author.rating}</span>
              </div>
            </div>
          </div>

          {/* Work Preview */}
          <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
            <div className="text-white text-center p-8">
              <div className="text-lg opacity-90 mb-4">{work.category.toUpperCase()}</div>
              <div className="text-3xl font-bold">PROJECT</div>
              <div className="text-sm opacity-75 mt-4">{work.title}</div>
            </div>
          </div>

          {/* Work Details */}
          <div>
            <Badge variant="outline" className="mb-3">{work.category}</Badge>
            {work.description && (
              <p className="text-gray-700 mb-4">{work.description}</p>
            )}
            {work.tags && (
              <div className="flex flex-wrap gap-2">
                {work.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <h4 className="font-semibold text-gray-900">Comments ({comments.length})</h4>
            </div>

            {/* Add Comment */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={2}
                    />
                    <Button 
                      onClick={handleSubmitComment}
                      size="sm" 
                      className="mt-2"
                      disabled={!newComment.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map(comment => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback>{comment.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{comment.user.name}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkModal;

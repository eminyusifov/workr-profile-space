
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MessageComposerProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName?: string;
  recipientId?: number;
}

const MessageComposer = ({ isOpen, onClose, recipientName = "Contractor", recipientId }: MessageComposerProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both subject and message are required.",
        variant: "destructive"
      });
      return;
    }

    console.log("Sending message:", { subject, message, recipientId });
    
    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${recipientName}.`,
    });

    setSubject("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Message to {recipientName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject..."
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={4}
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSend} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageComposer;

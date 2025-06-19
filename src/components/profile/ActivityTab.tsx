
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare } from "lucide-react";

const ActivityTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      <div className="space-y-4">
        <Card className="bg-white/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Your portfolio received 12 new likes</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">New message from Sarah Chen</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityTab;

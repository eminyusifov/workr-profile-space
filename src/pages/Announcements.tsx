
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import JobPostingForm from "@/components/announcements/JobPostingForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MapPin, DollarSign, Eye } from "lucide-react";
import { useUserType } from "@/contexts/UserTypeContext";

const Announcements = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isCustomer } = useUserType();

  // Mock announcements data
  const announcements = [
    {
      id: 1,
      title: "Need UI/UX Designer for Mobile App",
      description: "Looking for an experienced UI/UX designer to create a modern mobile app interface for our e-commerce platform.",
      budget: "$2,000 - $5,000",
      category: "Design",
      location: "Remote",
      postedDate: "2 days ago",
      applicants: 12,
      urgent: true
    },
    {
      id: 2,
      title: "WordPress Developer Required",
      description: "Seeking a skilled WordPress developer to build a custom theme for our business website.",
      budget: "$800 - $1,500",
      category: "Development",
      location: "New York, NY",
      postedDate: "1 week ago",
      applicants: 8,
      urgent: false
    },
    {
      id: 3,
      title: "Social Media Manager Position",
      description: "We need a creative social media manager to handle our Instagram and Facebook accounts.",
      budget: "$1,000 - $2,000",
      category: "Marketing",
      location: "Los Angeles, CA",
      postedDate: "3 days ago",
      applicants: 15,
      urgent: false
    }
  ];

  if (showCreateForm) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <PageHeader title="Create Announcement" showBackButton />
          
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button 
              variant="outline" 
              onClick={() => setShowCreateForm(false)}
              className="mb-6"
            >
              ← Back to Announcements
            </Button>
            <JobPostingForm />
          </div>

          <BottomNavigation activeTab="announcements" />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Job Announcements" showBackButton />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Job Announcements</h1>
              <p className="text-gray-600 dark:text-gray-300">Find amazing projects or post your own</p>
            </div>
            {isCustomer && (
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post a Job
              </Button>
            )}
          </div>

          {/* Announcements List */}
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {announcement.title}
                        </h3>
                        {announcement.urgent && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                        <Badge variant="outline">{announcement.category}</Badge>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {announcement.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{announcement.budget}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{announcement.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{announcement.postedDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{announcement.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for Contractors */}
          {!isCustomer && announcements.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No announcements yet</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back later for new job opportunities</p>
            </div>
          )}
        </div>

        <BottomNavigation activeTab="announcements" />
      </div>
    </ThemeProvider>
  );
};

export default Announcements;

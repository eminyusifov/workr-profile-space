
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MapPin, Clock, DollarSign } from "lucide-react";
import JobPostingForm from "@/components/announcements/JobPostingForm";
import { useToast } from "@/hooks/use-toast";

interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedAt: string;
  urgent: boolean;
}

const Announcements = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: 1,
      title: "Senior UI/UX Designer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      description: "We're looking for a talented UI/UX Designer to join our growing team...",
      requirements: ["5+ years experience", "Figma expertise", "Portfolio required"],
      postedAt: "2 hours ago",
      urgent: true
    },
    {
      id: 2,
      title: "Freelance Graphic Designer",
      company: "Creative Agency",
      location: "Remote",
      type: "Contract",
      salary: "$50-75/hour",
      description: "Seeking a creative graphic designer for various client projects...",
      requirements: ["Adobe Creative Suite", "Brand design experience", "Available 20+ hrs/week"],
      postedAt: "1 day ago",
      urgent: false
    }
  ]);

  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const { toast } = useToast();

  const handleJobSubmit = (jobData: any) => {
    const newJob: JobPosting = {
      id: jobPostings.length + 1,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      type: jobData.jobType,
      salary: jobData.budget,
      description: jobData.description,
      requirements: jobData.requirements?.split('\n').filter((req: string) => req.trim()) || [],
      postedAt: "Just now",
      urgent: jobData.urgent || false
    };

    setJobPostings(prev => [newJob, ...prev]);
    setIsJobFormOpen(false);
    
    toast({
      title: "Job Posted Successfully!",
      description: "Your job posting is now live and visible to all specialists.",
      duration: 3000,
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Job Board" showBackButton />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Announcements</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Discover opportunities and post your own job listings
              </p>
            </div>
            
            <Dialog open={isJobFormOpen} onOpenChange={setIsJobFormOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  <span>Post New Job</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Post a New Job</DialogTitle>
                </DialogHeader>
                <JobPostingForm onSubmit={handleJobSubmit} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {jobPostings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">
                        {job.title}
                        {job.urgent && (
                          <Badge className="ml-2 bg-red-500 text-white">URGENT</Badge>
                        )}
                      </CardTitle>
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">
                        {job.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{job.postedAt}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline">Save Job</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {jobPostings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No job postings available</p>
              <p className="text-sm text-gray-500 mt-2">Be the first to post a job opportunity!</p>
            </div>
          )}
        </div>

        <BottomNavigation activeTab="announcements" />
      </div>
    </ThemeProvider>
  );
};

export default Announcements;

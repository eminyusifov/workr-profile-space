
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MapPin, Clock, Eye } from "lucide-react";
import { useUserType } from "@/contexts/UserTypeContext";
import JobPostingForm from "@/components/announcements/JobPostingForm";
import { Link } from "react-router-dom";

interface JobPosting {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  location: string;
  category: string;
  postedBy: string;
  postedDate: string;
  applicants: number;
  status: 'open' | 'closed' | 'in-progress';
}

const Announcements = () => {
  const { isCustomer } = useUserType();
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobPostings] = useState<JobPosting[]>([
    {
      id: 1,
      title: "UI/UX Designer needed for Mobile App",
      description: "Looking for an experienced UI/UX designer to create a modern mobile app interface for our fintech startup. Must have experience with financial applications.",
      budget: "$2,000 - $5,000",
      deadline: "2024-02-15",
      location: "Remote",
      category: "Design",
      postedBy: "TechStart Inc.",
      postedDate: "2024-01-15",
      applicants: 12,
      status: 'open'
    },
    {
      id: 2,
      title: "Frontend Developer for E-commerce Platform",
      description: "We need a skilled React developer to build the frontend of our new e-commerce platform. Experience with Next.js and TypeScript preferred.",
      budget: "$3,000 - $8,000",
      deadline: "2024-03-01",
      location: "New York, NY",
      category: "Development",
      postedBy: "ShopFlow LLC",
      postedDate: "2024-01-10",
      applicants: 8,
      status: 'open'
    },
    {
      id: 3,
      title: "Brand Identity Design Package",
      description: "Complete brand identity package needed including logo, color palette, typography, and brand guidelines for a wellness startup.",
      budget: "$1,500 - $3,000",
      deadline: "2024-02-28",
      location: "Remote",
      category: "Branding",
      postedBy: "Wellness Co.",
      postedDate: "2024-01-12",
      applicants: 15,
      status: 'in-progress'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Job Announcements" showBackButton />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Announcements</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {isCustomer ? "Post jobs and find talented contractors" : "Browse available projects and opportunities"}
              </p>
            </div>
            {isCustomer && (
              <Button 
                onClick={() => setShowJobForm(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Post New Job</span>
              </Button>
            )}
          </div>

          <div className="grid gap-6">
            {jobPostings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-green-600">Budget:</span>
                      <span>{job.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Posted by <span className="font-medium">{job.postedBy}</span>
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.applicants} applicant{job.applicants !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/announcements/${job.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                      </Link>
                      {!isCustomer && job.status === 'open' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {jobPostings.length === 0 && (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No job postings yet</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  {isCustomer 
                    ? "Get started by posting your first job to connect with talented contractors."
                    : "Check back soon for new opportunities and projects."
                  }
                </p>
                {isCustomer && (
                  <Button 
                    onClick={() => setShowJobForm(true)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Post Your First Job
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>

        <JobPostingForm
          isOpen={showJobForm}
          onClose={() => setShowJobForm(false)}
        />

        <BottomNavigation activeTab="announcements" />
      </div>
    </ThemeProvider>
  );
};

export default Announcements;

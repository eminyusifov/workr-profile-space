import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Search, MessageCircle, Star, TrendingUp, Calendar, DollarSign, Eye, Heart, Briefcase } from "lucide-react";
import TeamCollaboration from "@/components/client/TeamCollaboration";
import SpecialistComparison from "@/components/client/SpecialistComparison";
import ProjectBriefModal from "@/components/client/ProjectBriefModal";
import { useToast } from "@/hooks/use-toast";

const ClientDashboard = () => {
  const { toast } = useToast();
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isProjectBriefOpen, setIsProjectBriefOpen] = useState(false);
  const [selectedSpecialists, setSelectedSpecialists] = useState<any[]>([]);

  // Mock data for client dashboard
  const dashboardStats = {
    totalProjects: 12,
    activeProjects: 3,
    completedProjects: 9,
    totalSpent: 45600,
    savedSpecialists: 28,
    teamMembers: 5
  };

  const recentActivity = [
    {
      id: 1,
      type: "project_completed",
      title: "Logo Design Project Completed",
      specialist: "Sarah Johnson",
      date: "2 hours ago",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
    },
    {
      id: 2,
      type: "specialist_saved",
      title: "Added Mike Chen to Favorites",
      specialist: "Mike Chen",
      date: "1 day ago",
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png"
    },
    {
      id: 3,
      type: "message_received",
      title: "New message from Emily Davis",
      specialist: "Emily Davis",
      date: "2 days ago",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      specialist: "Alex Rodriguez",
      progress: 75,
      budget: "$8,000",
      deadline: "2024-02-15",
      status: "In Progress",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      specialist: "Maya Patel",
      progress: 45,
      budget: "$5,500",
      deadline: "2024-02-28",
      status: "Design Phase",
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png"
    },
    {
      id: 3,
      title: "Brand Identity Package",
      specialist: "David Kim",
      progress: 90,
      budget: "$3,200",
      deadline: "2024-02-10",
      status: "Final Review",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
    }
  ];

  const recommendedSpecialists = [
    {
      id: 1,
      name: "Jennifer Liu",
      title: "Senior UX Designer",
      rating: 4.9,
      reviews: 156,
      hourlyRate: "$95/hour",
      skills: ["UX Design", "Prototyping", "User Research"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      matchScore: 95
    },
    {
      id: 2,
      name: "Robert Chen",
      title: "Full-Stack Developer",
      rating: 4.8,
      reviews: 203,
      hourlyRate: "$85/hour",
      skills: ["React", "Node.js", "MongoDB"],
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      matchScore: 92
    }
  ];

  const handleCompareSpecialists = () => {
    if (selectedSpecialists.length < 2) {
      toast({
        title: "Select Specialists",
        description: "Please select at least 2 specialists to compare.",
        variant: "destructive",
      });
      return;
    }
    setIsComparisonOpen(true);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project_completed": return <Briefcase className="h-4 w-4 text-green-500" />;
      case "specialist_saved": return <Heart className="h-4 w-4 text-red-500" />;
      case "message_received": return <MessageCircle className="h-4 w-4 text-blue-500" />;
      default: return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Client Dashboard" showBackButton />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Briefcase className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{dashboardStats.totalProjects}</div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{dashboardStats.activeProjects}</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{dashboardStats.completedProjects}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">${dashboardStats.totalSpent.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{dashboardStats.savedSpecialists}</div>
                <div className="text-sm text-gray-600">Saved Specialists</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{dashboardStats.teamMembers}</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="specialists">Specialists</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3">
                          {getActivityIcon(activity.type)}
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={activity.avatar} />
                            <AvatarFallback>{activity.specialist.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                        onClick={() => setIsProjectBriefOpen(true)}
                      >
                        <Briefcase className="h-6 w-6" />
                        <span className="text-sm">Post Project</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <Search className="h-6 w-6" />
                        <span className="text-sm">Find Specialists</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                        onClick={handleCompareSpecialists}
                      >
                        <Users className="h-6 w-6" />
                        <span className="text-sm">Compare</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <MessageCircle className="h-6 w-6" />
                        <span className="text-sm">Messages</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommended Specialists */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedSpecialists.map((specialist) => (
                      <div key={specialist.id} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={specialist.avatar} />
                            <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{specialist.name}</h4>
                            <p className="text-sm text-gray-600">{specialist.title}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{specialist.rating} ({specialist.reviews})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {specialist.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{specialist.hourlyRate}</span>
                          <Badge className="bg-green-100 text-green-800">
                            {specialist.matchScore}% match
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeProjects.map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{project.title}</h4>
                          <Badge variant="outline">{project.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={project.avatar} />
                            <AvatarFallback>{project.specialist.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{project.specialist}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Progress:</span>
                            <div className="font-medium">{project.progress}%</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Budget:</span>
                            <div className="font-medium">{project.budget}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Deadline:</span>
                            <div className="font-medium">{project.deadline}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specialists" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Saved Specialists</h3>
                <Button onClick={handleCompareSpecialists}>
                  Compare Selected
                </Button>
              </div>
              {/* Specialist list would go here */}
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">Your saved specialists will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <TeamCollaboration />
            </TabsContent>
          </Tabs>
        </div>

        {/* Modals */}
        <SpecialistComparison
          isOpen={isComparisonOpen}
          onClose={() => setIsComparisonOpen(false)}
          specialists={selectedSpecialists}
          onContactSpecialist={(specialist) => {
            console.log("Contact specialist:", specialist);
          }}
        />

        <ProjectBriefModal
          isOpen={isProjectBriefOpen}
          onClose={() => setIsProjectBriefOpen(false)}
        />

        <BottomNavigation activeTab="dashboard" />
      </div>
    </ThemeProvider>
  );
};

export default ClientDashboard;
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, MessageCircle, DollarSign, Star, Calendar, Users, Award } from "lucide-react";
import BusinessAnalytics from "@/components/specialist/BusinessAnalytics";
import ProfileOptimization from "@/components/specialist/ProfileOptimization";
import LeadManagement from "@/components/specialist/LeadManagement";

const SpecialistDashboard = () => {
  // Mock data for specialist dashboard
  const dashboardStats = {
    profileViews: 1247,
    inquiries: 89,
    activeProjects: 4,
    monthlyRevenue: 8500,
    rating: 4.8,
    responseTime: "2.3h",
    completionRate: 98,
    repeatClients: 73
  };

  const recentInquiries = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      projectTitle: "E-commerce Website Redesign",
      budget: "$5,000 - $8,000",
      receivedDate: "2 hours ago",
      status: "new"
    },
    {
      id: 2,
      clientName: "Mike Chen",
      projectTitle: "Mobile App Design",
      budget: "$3,000 - $5,000",
      receivedDate: "1 day ago",
      status: "responded"
    },
    {
      id: 3,
      clientName: "Emily Davis",
      projectTitle: "Brand Identity Package",
      budget: "$2,000 - $3,000",
      receivedDate: "2 days ago",
      status: "negotiating"
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: "SaaS Dashboard Design",
      client: "TechCorp Inc.",
      progress: 75,
      deadline: "2024-02-15",
      value: "$4,500"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      client: "FinanceFlow",
      progress: 45,
      deadline: "2024-02-28",
      value: "$6,200"
    },
    {
      id: 3,
      title: "E-learning Platform",
      client: "EduTech Solutions",
      progress: 90,
      deadline: "2024-02-10",
      value: "$3,800"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "responded": return "bg-green-100 text-green-800";
      case "negotiating": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Specialist Dashboard" showBackButton />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold">{dashboardStats.profileViews.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+12% this month</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New Inquiries</p>
                    <p className="text-2xl font-bold">{dashboardStats.inquiries}</p>
                    <p className="text-sm text-green-600">+8% this month</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold">${dashboardStats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+15% this month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Client Rating</p>
                    <p className="text-2xl font-bold">{dashboardStats.rating}</p>
                    <p className="text-sm text-green-600">+3% this month</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leads">Lead Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{inquiry.projectTitle}</h4>
                            <Badge className={getStatusColor(inquiry.status)}>
                              {inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">by {inquiry.clientName}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{inquiry.budget}</span>
                            <span>{inquiry.receivedDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{dashboardStats.responseTime}</div>
                        <div className="text-sm text-gray-600">Avg Response Time</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{dashboardStats.completionRate}%</div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{dashboardStats.repeatClients}%</div>
                        <div className="text-sm text-gray-600">Repeat Clients</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{dashboardStats.activeProjects}</div>
                        <div className="text-sm text-gray-600">Active Projects</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Active Projects */}
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
                          <Badge variant="outline">{project.value}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Client: {project.client}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Progress:</span>
                            <div className="font-medium">{project.progress}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
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

            <TabsContent value="leads">
              <LeadManagement />
            </TabsContent>

            <TabsContent value="analytics">
              <BusinessAnalytics />
            </TabsContent>

            <TabsContent value="optimization">
              <ProfileOptimization />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Project management tools coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <BottomNavigation activeTab="dashboard" />
      </div>
    </ThemeProvider>
  );
};

export default SpecialistDashboard;
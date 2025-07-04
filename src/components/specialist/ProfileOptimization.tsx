import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, TrendingUp, Eye, Star, MessageCircle, Camera, FileText, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileOptimization = () => {
  const { toast } = useToast();
  const [completionScore, setCompletionScore] = useState(85);

  const optimizationChecklist = [
    {
      id: 1,
      category: "Profile Basics",
      items: [
        { name: "Professional photo", completed: true, impact: "High", description: "Clear, professional headshot" },
        { name: "Compelling bio", completed: true, impact: "High", description: "Detailed description of your expertise" },
        { name: "Contact information", completed: true, impact: "Medium", description: "Complete contact details" },
        { name: "Location & timezone", completed: false, impact: "Medium", description: "Help clients understand availability" }
      ]
    },
    {
      id: 2,
      category: "Portfolio & Work",
      items: [
        { name: "Portfolio samples", completed: true, impact: "Critical", description: "At least 6 high-quality work samples" },
        { name: "Project descriptions", completed: true, impact: "High", description: "Detailed case studies for each project" },
        { name: "Before/after showcases", completed: false, impact: "Medium", description: "Show transformation in your work" },
        { name: "Video content", completed: false, impact: "Medium", description: "Process videos or presentations" }
      ]
    },
    {
      id: 3,
      category: "Skills & Expertise",
      items: [
        { name: "Skills listed", completed: true, impact: "Critical", description: "Comprehensive skills list" },
        { name: "Skill levels defined", completed: true, impact: "High", description: "Proficiency levels for each skill" },
        { name: "Certifications uploaded", completed: false, impact: "Medium", description: "Professional certifications and awards" },
        { name: "Tools & software", completed: true, impact: "High", description: "List of professional tools you use" }
      ]
    },
    {
      id: 4,
      category: "Availability & Pricing",
      items: [
        { name: "Pricing information", completed: true, impact: "Critical", description: "Clear pricing structure" },
        { name: "Availability status", completed: true, impact: "High", description: "Current availability for new projects" },
        { name: "Response time", completed: true, impact: "High", description: "Expected response time to inquiries" },
        { name: "Work preferences", completed: false, impact: "Medium", description: "Remote/on-site preferences" }
      ]
    }
  ];

  const seoOptimization = {
    score: 78,
    improvements: [
      { area: "Keywords", status: "good", suggestion: "Add 2-3 more industry-specific keywords" },
      { area: "Profile Title", status: "excellent", suggestion: "Well optimized for search" },
      { area: "Description", status: "needs-work", suggestion: "Include more relevant keywords naturally" },
      { area: "Skills Tags", status: "good", suggestion: "Consider adding emerging skill trends" }
    ]
  };

  const competitiveAnalysis = {
    ranking: "Top 15%",
    category: "UX/UI Design",
    strengths: ["Portfolio Quality", "Response Time", "Client Reviews"],
    improvements: ["Pricing Strategy", "Service Packages", "Social Proof"]
  };

  const performanceMetrics = [
    { metric: "Profile Views", value: "1,247", change: "+12%", trend: "up" },
    { metric: "Search Appearances", value: "892", change: "+8%", trend: "up" },
    { metric: "Inquiry Rate", value: "7.1%", change: "-2%", trend: "down" },
    { metric: "Response Rate", value: "95%", change: "+3%", trend: "up" }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "needs-work": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const handleOptimizationAction = (action: string) => {
    toast({
      title: "Optimization Action",
      description: `Starting ${action} optimization...`,
    });
  };

  const completedItems = optimizationChecklist.reduce((total, category) => 
    total + category.items.filter(item => item.completed).length, 0
  );
  const totalItems = optimizationChecklist.reduce((total, category) => 
    total + category.items.length, 0
  );

  return (
    <div className="space-y-6">
      {/* Profile Completion Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Profile Optimization Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{completionScore}%</span>
              <Badge className="bg-green-100 text-green-800">Good</Badge>
            </div>
            <Progress value={completionScore} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold">{completedItems}/{totalItems}</div>
                <div className="text-sm text-gray-600">Items Complete</div>
              </div>
              <div>
                <div className="text-lg font-bold">Top 15%</div>
                <div className="text-sm text-gray-600">Category Ranking</div>
              </div>
              <div>
                <div className="text-lg font-bold">1,247</div>
                <div className="text-sm text-gray-600">Monthly Views</div>
              </div>
              <div>
                <div className="text-lg font-bold">7.1%</div>
                <div className="text-sm text-gray-600">Inquiry Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.metric}</p>
                  <p className="text-xl font-bold">{metric.value}</p>
                  <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} vs last month
                  </p>
                </div>
                <div className="text-2xl">
                  {metric.trend === 'up' ? '📈' : '📉'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Optimization Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {optimizationChecklist.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  {category.category === "Profile Basics" && <Users className="h-4 w-4" />}
                  {category.category === "Portfolio & Work" && <Camera className="h-4 w-4" />}
                  {category.category === "Skills & Expertise" && <Award className="h-4 w-4" />}
                  {category.category === "Availability & Pricing" && <MessageCircle className="h-4 w-4" />}
                  <span>{category.category}</span>
                </h4>
                <div className="space-y-3">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                        )}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getImpactColor(item.impact)}>
                          {item.impact}
                        </Badge>
                        {!item.completed && (
                          <Button size="sm" variant="outline">
                            Fix
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Optimization */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">SEO Score</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{seoOptimization.score}%</span>
                <Badge className="bg-blue-100 text-blue-800">Good</Badge>
              </div>
            </div>
            <Progress value={seoOptimization.score} className="h-2" />
            <div className="space-y-3">
              {seoOptimization.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{improvement.area}</div>
                    <div className="text-sm text-gray-600">{improvement.suggestion}</div>
                  </div>
                  <Badge className={getStatusColor(improvement.status)}>
                    {improvement.status.replace('-', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Competitive Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{competitiveAnalysis.ranking}</div>
                <div className="text-sm text-gray-600">in {competitiveAnalysis.category}</div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Your Strengths</h5>
                <div className="space-y-1">
                  {competitiveAnalysis.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improvement Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Areas to Improve</h5>
                <div className="space-y-1">
                  {competitiveAnalysis.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleOptimizationAction("competitive analysis")}
              >
                Get Detailed Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Optimization Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleOptimizationAction("portfolio update")}
            >
              <Camera className="h-6 w-6" />
              <span className="text-sm">Update Portfolio</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleOptimizationAction("SEO optimization")}
            >
              <Eye className="h-6 w-6" />
              <span className="text-sm">Optimize SEO</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleOptimizationAction("skills update")}
            >
              <Award className="h-6 w-6" />
              <span className="text-sm">Update Skills</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleOptimizationAction("pricing review")}
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Review Pricing</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOptimization;
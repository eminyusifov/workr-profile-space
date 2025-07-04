import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, MessageCircle, DollarSign, Users, Calendar, MapPin, Star } from "lucide-react";

const BusinessAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock analytics data
  const profileViews = [
    { date: '2024-01-01', views: 45, inquiries: 3 },
    { date: '2024-01-02', views: 52, inquiries: 5 },
    { date: '2024-01-03', views: 38, inquiries: 2 },
    { date: '2024-01-04', views: 67, inquiries: 8 },
    { date: '2024-01-05', views: 71, inquiries: 6 },
    { date: '2024-01-06', views: 59, inquiries: 4 },
    { date: '2024-01-07', views: 83, inquiries: 9 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4500, projects: 3 },
    { month: 'Feb', revenue: 6200, projects: 4 },
    { month: 'Mar', revenue: 5800, projects: 3 },
    { month: 'Apr', revenue: 7200, projects: 5 },
    { month: 'May', revenue: 8100, projects: 6 },
    { month: 'Jun', revenue: 9500, projects: 7 },
  ];

  const clientSources = [
    { name: 'Direct Search', value: 45, color: '#3B82F6' },
    { name: 'Referrals', value: 30, color: '#10B981' },
    { name: 'Social Media', value: 15, color: '#F59E0B' },
    { name: 'Portfolio Views', value: 10, color: '#EF4444' },
  ];

  const geographicData = [
    { region: 'North America', clients: 45, revenue: 15600 },
    { region: 'Europe', clients: 32, revenue: 11200 },
    { region: 'Asia', clients: 18, revenue: 6800 },
    { region: 'Other', clients: 12, revenue: 4200 },
  ];

  const performanceMetrics = {
    profileViews: { current: 1247, change: 12.5, trend: 'up' },
    inquiries: { current: 89, change: 8.3, trend: 'up' },
    conversionRate: { current: 7.1, change: -2.1, trend: 'down' },
    avgProjectValue: { current: 1850, change: 15.7, trend: 'up' },
    responseTime: { current: '2.3h', change: -18.2, trend: 'up' },
    clientSatisfaction: { current: 4.8, change: 3.2, trend: 'up' },
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : '↘️';
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Business Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Profile Views</p>
                <p className="text-2xl font-bold">{performanceMetrics.profileViews.current.toLocaleString()}</p>
                <p className={`text-sm ${getTrendColor(performanceMetrics.profileViews.trend)}`}>
                  {getTrendIcon(performanceMetrics.profileViews.trend)} {Math.abs(performanceMetrics.profileViews.change)}%
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inquiries</p>
                <p className="text-2xl font-bold">{performanceMetrics.inquiries.current}</p>
                <p className={`text-sm ${getTrendColor(performanceMetrics.inquiries.trend)}`}>
                  {getTrendIcon(performanceMetrics.inquiries.trend)} {Math.abs(performanceMetrics.inquiries.change)}%
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Project Value</p>
                <p className="text-2xl font-bold">${performanceMetrics.avgProjectValue.current.toLocaleString()}</p>
                <p className={`text-sm ${getTrendColor(performanceMetrics.avgProjectValue.trend)}`}>
                  {getTrendIcon(performanceMetrics.avgProjectValue.trend)} {Math.abs(performanceMetrics.avgProjectValue.change)}%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{performanceMetrics.conversionRate.current}%</p>
                <p className={`text-sm ${getTrendColor(performanceMetrics.conversionRate.trend)}`}>
                  {getTrendIcon(performanceMetrics.conversionRate.trend)} {Math.abs(performanceMetrics.conversionRate.change)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold">{performanceMetrics.responseTime.current}</p>
                <p className={`text-sm ${getTrendColor(performanceMetrics.responseTime.trend)}`}>
                  {getTrendIcon(performanceMetrics.responseTime.trend)} {Math.abs(performanceMetrics.responseTime.change)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Client Rating</p>
                <p className="text-2xl font-bold">{performanceMetrics.clientSatisfaction.current}</p>
                <p className={`text-sm ${getTrendColor(performanceMetrics.clientSatisfaction.trend)}`}>
                  {getTrendIcon(performanceMetrics.clientSatisfaction.trend)} {Math.abs(performanceMetrics.clientSatisfaction.change)}%
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">Traffic & Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="clients">Client Insights</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Views & Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={profileViews}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="inquiries" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={clientSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {clientSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {clientSources.map((source) => (
                    <div key={source.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                        <span className="text-sm">{source.name}</span>
                      </div>
                      <Badge variant="outline">{source.value}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Revenue (6 months)</span>
                    <span className="font-bold">$41,300</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Monthly Revenue</span>
                    <span className="font-bold">$6,883</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Projects</span>
                    <span className="font-bold">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Project Value</span>
                    <span className="font-bold">$1,475</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$12,500</div>
                    <div className="text-sm text-gray-600">Projected Next Month</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Confidence Level</span>
                      <Badge className="bg-green-100 text-green-800">High (85%)</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Based on</span>
                      <span className="text-sm">6 months data</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((region) => (
                  <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{region.region}</div>
                        <div className="text-sm text-gray-600">{region.clients} clients</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${region.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">73%</div>
                    <div className="text-sm text-gray-600">Return Client Rate</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">New Clients</span>
                      <span className="text-sm font-medium">27%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Returning Clients</span>
                      <span className="text-sm font-medium">73%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">4.8</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">5 Stars</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">4 Stars</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">3 Stars</span>
                      <span className="text-sm font-medium">4%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Optimization Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">Profile Completeness</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Portfolio Quality</span>
                      <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Rate</span>
                      <Badge className="bg-green-100 text-green-800">95%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profile Views</span>
                      <Badge className="bg-blue-100 text-blue-800">High</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">Top 15%</div>
                    <div className="text-sm text-gray-600">In Your Category</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pricing Position</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Share</span>
                      <Badge className="bg-blue-100 text-blue-800">Growing</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Demand Level</span>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Improvement Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Portfolio Enhancement</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Add 2-3 more recent projects to showcase your latest work and improve client confidence.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Response Time</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your response time is excellent! Maintain this to keep high conversion rates.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900">Pricing Strategy</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Consider offering package deals to increase average project value by 20-30%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessAnalytics;
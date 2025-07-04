import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Clock, DollarSign, User, Calendar, Filter, Search, Send, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: number;
  clientName: string;
  clientAvatar: string;
  projectTitle: string;
  budget: string;
  timeline: string;
  status: 'new' | 'responded' | 'negotiating' | 'won' | 'lost';
  priority: 'high' | 'medium' | 'low';
  receivedDate: string;
  lastActivity: string;
  description: string;
  skills: string[];
  responseTime?: string;
}

const LeadManagement = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      clientName: "Sarah Johnson",
      clientAvatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      projectTitle: "E-commerce Website Redesign",
      budget: "$5,000 - $8,000",
      timeline: "6 weeks",
      status: 'new',
      priority: 'high',
      receivedDate: "2024-01-15",
      lastActivity: "2 hours ago",
      description: "Looking for a complete redesign of our e-commerce platform with modern UI/UX...",
      skills: ["UI/UX Design", "E-commerce", "Figma"]
    },
    {
      id: 2,
      clientName: "Mike Chen",
      clientAvatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      projectTitle: "Mobile App Design",
      budget: "$3,000 - $5,000",
      timeline: "4 weeks",
      status: 'responded',
      priority: 'medium',
      receivedDate: "2024-01-14",
      lastActivity: "1 day ago",
      description: "Need a mobile app design for our fitness tracking application...",
      skills: ["Mobile Design", "UI/UX", "Prototyping"],
      responseTime: "2 hours"
    },
    {
      id: 3,
      clientName: "Emily Davis",
      clientAvatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      projectTitle: "Brand Identity Package",
      budget: "$2,000 - $3,000",
      timeline: "3 weeks",
      status: 'negotiating',
      priority: 'high',
      receivedDate: "2024-01-12",
      lastActivity: "3 hours ago",
      description: "Complete brand identity including logo, colors, typography...",
      skills: ["Branding", "Logo Design", "Graphic Design"]
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [responseMessage, setResponseMessage] = useState("");

  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    responded: "bg-green-100 text-green-800",
    negotiating: "bg-yellow-100 text-yellow-800",
    won: "bg-emerald-100 text-emerald-800",
    lost: "bg-red-100 text-red-800"
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-gray-100 text-gray-800"
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    const matchesPriority = filterPriority === "all" || lead.priority === filterPriority;
    const matchesSearch = searchQuery === "" || 
      lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleStatusChange = (leadId: number, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    toast({
      title: "Status Updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  const handleSendResponse = () => {
    if (!selectedLead || !responseMessage.trim()) {
      toast({
        title: "Missing Information",
        description: "Please write a response message.",
        variant: "destructive",
      });
      return;
    }

    handleStatusChange(selectedLead.id, 'responded');
    setResponseMessage("");
    setSelectedLead(null);
    
    toast({
      title: "Response Sent",
      description: `Your response has been sent to ${selectedLead.clientName}`,
    });
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'responded': return <CheckCircle className="h-4 w-4" />;
      case 'negotiating': return <MessageCircle className="h-4 w-4" />;
      case 'won': return <CheckCircle className="h-4 w-4" />;
      case 'lost': return <AlertCircle className="h-4 w-4" />;
    }
  };

  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    responded: leads.filter(l => l.status === 'responded').length,
    won: leads.filter(l => l.status === 'won').length,
    conversionRate: leads.length > 0 ? ((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1) : 0
  };

  return (
    <div className="space-y-6">
      {/* Lead Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{leadStats.total}</div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{leadStats.new}</div>
            <div className="text-sm text-gray-600">New Inquiries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{leadStats.responded}</div>
            <div className="text-sm text-gray-600">Responded</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{leadStats.won}</div>
            <div className="text-sm text-gray-600">Won Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{leadStats.conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={lead.clientAvatar} />
                      <AvatarFallback>{lead.clientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{lead.projectTitle}</h3>
                        <Badge className={priorityColors[lead.priority]}>
                          {lead.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">by {lead.clientName}</p>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{lead.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {lead.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{lead.budget}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{lead.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{lead.lastActivity}</span>
                        </div>
                        {lead.responseTime && (
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>Responded in {lead.responseTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3">
                    <Badge className={`${statusColors[lead.status]} flex items-center space-x-1`}>
                      {getStatusIcon(lead.status)}
                      <span>{lead.status}</span>
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Respond
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Respond to {lead.clientName}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium mb-2">{lead.projectTitle}</h4>
                              <p className="text-sm text-gray-600">{lead.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span>Budget: {lead.budget}</span>
                                <span>Timeline: {lead.timeline}</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Your Response</label>
                              <Textarea
                                placeholder="Write your response to the client..."
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                rows={6}
                              />
                            </div>
                            <div className="flex space-x-3">
                              <Button onClick={handleSendResponse} className="flex-1">
                                <Send className="h-4 w-4 mr-2" />
                                Send Response
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Save Draft
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Select value={lead.status} onValueChange={(value) => handleStatusChange(lead.id, value as Lead['status'])}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="responded">Responded</SelectItem>
                          <SelectItem value="negotiating">Negotiating</SelectItem>
                          <SelectItem value="won">Won</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {['new', 'responded', 'negotiating', 'won', 'lost'].map((status) => (
              <Card key={status}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium capitalize flex items-center space-x-2">
                    {getStatusIcon(status as Lead['status'])}
                    <span>{status}</span>
                    <Badge variant="outline" className="ml-auto">
                      {leads.filter(l => l.status === status).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leads.filter(l => l.status === status).map((lead) => (
                    <div key={lead.id} className="p-3 border rounded-lg bg-white">
                      <h4 className="font-medium text-sm mb-1">{lead.projectTitle}</h4>
                      <p className="text-xs text-gray-600 mb-2">{lead.clientName}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span>{lead.budget}</span>
                        <Badge className={priorityColors[lead.priority]} variant="outline">
                          {lead.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadManagement;
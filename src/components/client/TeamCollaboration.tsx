import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Mail, Shield, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  avatar: string;
  joinedDate: string;
  lastActive: string;
}

interface SharedList {
  id: number;
  name: string;
  type: 'favorites' | 'shortlist' | 'hired';
  specialistCount: number;
  sharedWith: string[];
  createdBy: string;
  createdDate: string;
}

const TeamCollaboration = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Project Manager",
      permissions: ["view", "edit", "hire"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@company.com",
      role: "Design Lead",
      permissions: ["view", "edit"],
      avatar: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      joinedDate: "2024-02-01",
      lastActive: "1 day ago"
    }
  ]);

  const [sharedLists, setSharedLists] = useState<SharedList[]>([
    {
      id: 1,
      name: "Q1 Design Projects",
      type: 'favorites',
      specialistCount: 12,
      sharedWith: ["sarah@company.com", "mike@company.com"],
      createdBy: "You",
      createdDate: "2024-01-20"
    },
    {
      id: 2,
      name: "Mobile App Developers",
      type: 'shortlist',
      specialistCount: 8,
      sharedWith: ["sarah@company.com"],
      createdBy: "Sarah Johnson",
      createdDate: "2024-02-05"
    }
  ]);

  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const roles = [
    { value: "admin", label: "Admin", permissions: ["view", "edit", "hire", "manage"] },
    { value: "manager", label: "Project Manager", permissions: ["view", "edit", "hire"] },
    { value: "lead", label: "Team Lead", permissions: ["view", "edit"] },
    { value: "member", label: "Team Member", permissions: ["view"] }
  ];

  const handleInviteMember = () => {
    if (!newMemberEmail || !newMemberRole) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const selectedRole = roles.find(r => r.value === newMemberRole);
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: selectedRole?.label || "Team Member",
      permissions: selectedRole?.permissions || ["view"],
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: "Just invited"
    };

    setTeamMembers(prev => [...prev, newMember]);
    setNewMemberEmail("");
    setNewMemberRole("");
    setIsInviteModalOpen(false);

    toast({
      title: "Invitation Sent",
      description: `Team invitation sent to ${newMemberEmail}`,
    });
  };

  const removeMember = (memberId: number) => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
    toast({
      title: "Member Removed",
      description: "Team member has been removed from the workspace.",
    });
  };

  const getPermissionBadgeColor = (permission: string) => {
    switch (permission) {
      case 'manage': return 'bg-red-100 text-red-800';
      case 'hire': return 'bg-blue-100 text-blue-800';
      case 'edit': return 'bg-green-100 text-green-800';
      case 'view': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Members Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Members</span>
            </CardTitle>
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      placeholder="colleague@company.com"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-gray-500">
                                {role.permissions.join(", ")}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handleInviteMember} className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Invitation
                    </Button>
                    <Button variant="outline" onClick={() => setIsInviteModalOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{member.role}</Badge>
                      <span className="text-xs text-gray-500">Last active: {member.lastActive}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {member.permissions.map((permission) => (
                      <Badge
                        key={permission}
                        className={`text-xs ${getPermissionBadgeColor(permission)}`}
                      >
                        {permission}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMember(member.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shared Lists Section */}
      <Card>
        <CardHeader>
          <CardTitle>Shared Lists & Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sharedLists.map((list) => (
              <div key={list.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{list.name}</h4>
                  <p className="text-sm text-gray-600">
                    {list.specialistCount} specialists • Created by {list.createdBy}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{list.type}</Badge>
                    <span className="text-xs text-gray-500">
                      Shared with {list.sharedWith.length} member{list.sharedWith.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collaboration Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">Specialists Reviewed</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Collaborative Decisions</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamCollaboration;
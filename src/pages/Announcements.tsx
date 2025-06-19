
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, ChevronLeft, Clock, DollarSign, MapPin, Building } from "lucide-react";
import { Link } from "react-router-dom";
import JobPostingForm from "@/components/announcements/JobPostingForm";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Announcements = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  // Mock announcements data
  const announcements = [
    {
      id: 1,
      type: "task",
      title: "Design a modern logo for tech startup",
      description: "Looking for a creative designer to create a modern, minimalist logo for our AI technology startup. The logo should convey innovation and trust.",
      author: { name: "John Smith", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      budget: 500,
      deadline: "2024-01-15",
      urgency: "Medium",
      category: "Graphic Design",
      skills: ["Logo Design", "Branding", "Adobe Illustrator"],
      postedAt: "2 hours ago",
      applicants: 12
    },
    {
      id: 2,
      type: "job",
      title: "Senior UX Designer",
      description: "We're looking for a Senior UX Designer to join our product team. You'll be responsible for designing user experiences for our mobile and web applications.",
      author: { name: "TechCorp", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      company: "TechCorp",
      location: "Baku, Azerbaijan",
      workType: "Hybrid",
      salary: "2000-3000",
      category: "UX/UI Design",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      postedAt: "1 day ago",
      applicants: 8
    },
    {
      id: 3,
      type: "task",
      title: "E-commerce website redesign",
      description: "Need to redesign our existing e-commerce website to improve user experience and conversion rates. Must be mobile-responsive.",
      author: { name: "Sarah Chen", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      budget: 1200,
      deadline: "2024-02-01",
      urgency: "High",
      category: "Web Development",
      skills: ["React", "E-commerce", "Responsive Design"],
      postedAt: "3 days ago",
      applicants: 24
    }
  ];

  const filteredAnnouncements = filter === "all" 
    ? announcements 
    : announcements.filter(ann => ann.type === filter);

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  workr
                </h1>
                <span className="text-gray-400">|</span>
                <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <JobPostingForm />
        </div>

        <BottomNavigation activeTab="announcements" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                workr
              </h1>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Post</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Posts
          </Button>
          <Button
            variant={filter === "task" ? "default" : "outline"}
            onClick={() => setFilter("task")}
          >
            Tasks
          </Button>
          <Button
            variant={filter === "job" ? "default" : "outline"}
            onClick={() => setFilter("job")}
          >
            Job Openings
          </Button>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map(announcement => (
            <Card key={announcement.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={announcement.author.avatar} />
                      <AvatarFallback>{announcement.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{announcement.author.name}</h3>
                      <p className="text-sm text-gray-600">{announcement.postedAt}</p>
                    </div>
                  </div>
                  <Badge variant={announcement.type === "task" ? "default" : "secondary"}>
                    {announcement.type === "task" ? "Task" : "Job Opening"}
                  </Badge>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">{announcement.title}</h2>
                <p className="text-gray-700 mb-4">{announcement.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {announcement.type === "task" ? (
                    <>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">${announcement.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{announcement.deadline}</span>
                      </div>
                      <div>
                        <Badge variant={
                          announcement.urgency === "High" ? "destructive" :
                          announcement.urgency === "Medium" ? "default" : "secondary"
                        }>
                          {announcement.urgency}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Building className="h-4 w-4" />
                        <span className="text-sm">{announcement.company}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{announcement.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">${announcement.salary}</span>
                      </div>
                      <div>
                        <Badge variant="outline">{announcement.workType}</Badge>
                      </div>
                    </>
                  )}
                </div>

                <div className="mb-4">
                  <Badge variant="outline" className="mr-2">{announcement.category}</Badge>
                  {announcement.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="mr-2 mb-1">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {announcement.applicants} applicants
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Save</Button>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation activeTab="announcements" />
    </div>
  );
};

export default Announcements;

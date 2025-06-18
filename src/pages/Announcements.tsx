
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Clock, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Announcements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Design", "Development", "Marketing", "Writing", "Video"];

  const announcements = [
    {
      id: 1,
      title: "Need Logo Design for Tech Startup",
      description: "Looking for a creative designer to create a modern logo for our new tech startup. Must have experience with SaaS branding.",
      budget: "$500 - $1,000",
      location: "Remote",
      postedTime: "2 hours ago",
      category: "Design",
      urgent: true,
      client: {
        name: "Tech Innovators",
        avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
        verified: true
      },
      applicants: 12
    },
    {
      id: 2,
      title: "React Developer for E-commerce Project",
      description: "Seeking an experienced React developer to build a modern e-commerce platform. Must have knowledge of Next.js and TypeScript.",
      budget: "$3,000 - $5,000",
      location: "Hybrid - Baku",
      postedTime: "5 hours ago",
      category: "Development",
      urgent: false,
      client: {
        name: "E-Shop Solutions",
        avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
        verified: true
      },
      applicants: 8
    },
    {
      id: 3,
      title: "Social Media Marketing Campaign",
      description: "Need a social media expert to run Instagram and Facebook campaigns for our fashion brand. 3-month project.",
      budget: "$800 - $1,200/month",
      location: "Remote",
      postedTime: "1 day ago",
      category: "Marketing",
      urgent: false,
      client: {
        name: "Fashion Forward",
        avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
        verified: false
      },
      applicants: 24
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  workr
                </h1>
              </Link>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Post Job</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Search and Categories */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search job posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full px-4 py-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Active Jobs <span className="text-blue-600">({filteredAnnouncements.length})</span>
            </h3>
          </div>

          <div className="space-y-6">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={announcement.client.avatar} />
                        <AvatarFallback>{announcement.client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{announcement.client.name}</h4>
                          {announcement.client.verified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{announcement.postedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{announcement.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {announcement.urgent && (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          Urgent
                        </Badge>
                      )}
                      <Badge variant="outline">{announcement.category}</Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {announcement.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">{announcement.budget}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {announcement.applicants} applicants
                      </span>
                    </div>
                    <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-xs">ƏSAS</span>
            </Button>
          </Link>
          <Link to="/catalog">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-6 h-1 bg-gray-300 rounded" />
              <span className="text-xs">KATALOQ</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 rounded" />
            <span className="text-xs">ELAN</span>
          </Button>
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-xs">BLAQQ</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
              <span className="text-xs">PROFİL</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Announcements;

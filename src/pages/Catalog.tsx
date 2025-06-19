
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const categories = [
    { name: "Graphic Design", count: 124 },
    { name: "UX/UI Design", count: 89 },
    { name: "Photography", count: 156 },
    { name: "Social Media Marketing", count: 78 },
    { name: "Animation", count: 45 },
    { name: "Web Development", count: 92 },
    { name: "Content Writing", count: 67 },
    { name: "Video Editing", count: 83 },
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

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
              <h2 className="text-lg font-semibold text-gray-900">Catalog</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search categories, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter} ×
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilters([])}
                className="text-sm text-gray-500"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Service Categories
            </h3>
            <span className="text-gray-500">{categories.length} categories</span>
          </div>

          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-0 shadow-md cursor-pointer"
                onClick={() => toggleFilter(category.name)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {category.count} specialists
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Find skilled professionals in {category.name.toLowerCase()}
                  </p>
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
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-blue-600">
            <div className="w-6 h-1 bg-blue-600 rounded" />
            <span className="text-xs">KATALOQ</span>
          </Button>
          <Link to="/announcements">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 rounded" />
              <span className="text-xs">ELAN</span>
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-xs">MESAJ</span>
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

export default Catalog;

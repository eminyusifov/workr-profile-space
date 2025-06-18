
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Design Tips", "Career", "Freelancing", "Technology", "Inspiration"];

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Design Principles Every Creative Should Know",
      excerpt: "Master these fundamental design principles to elevate your creative work and impress clients with professional-quality designs.",
      content: "Design is more than making things look pretty...",
      image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      author: {
        name: "Sarah Chen",
        username: "@sarahchen",
        avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
      },
      publishedAt: "2 days ago",
      readTime: "5 min read",
      category: "Design Tips",
      likes: 124,
      comments: 18,
      bookmarked: false
    },
    {
      id: 2,
      title: "From Freelancer to Agency: My Journey in 2024",
      excerpt: "How I scaled my one-person design business into a thriving creative agency with a team of 8 talented professionals.",
      content: "Starting as a freelancer was both exciting and terrifying...",
      image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      author: {
        name: "Alex Rodriguez",
        username: "@alexdesigns",
        avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
      },
      publishedAt: "1 week ago",
      readTime: "8 min read",
      category: "Career",
      likes: 89,
      comments: 12,
      bookmarked: true
    },
    {
      id: 3,
      title: "The Future of Remote Creative Work",
      excerpt: "Exploring how technology and changing work culture are reshaping the creative industry for remote professionals.",
      content: "The pandemic changed everything about how we work...",
      image: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      author: {
        name: "Maya Patel",
        username: "@mayacreates",
        avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png"
      },
      publishedAt: "3 days ago",
      readTime: "6 min read",
      category: "Technology",
      likes: 156,
      comments: 24,
      bookmarked: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
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
              <h2 className="text-lg font-semibold text-gray-900">Blog</h2>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Creative <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Tips, stories, and inspiration from the creative community
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
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

      {/* Blog Posts */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-[4/3] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <div className="text-white text-center p-4">
                          <div className="text-sm opacity-90 mb-2">ARTICLE</div>
                          <div className="text-lg font-bold">PREVIEW</div>
                          <div className="text-xs opacity-75 mt-2">{post.category}</div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{post.author.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{post.publishedAt}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Badge variant="outline" className="mb-3">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className={`${post.bookmarked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600`}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
          <Link to="/announcements">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 rounded" />
              <span className="text-xs">ELAN</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-blue-600">
            <div className="w-4 h-4 bg-blue-600 rounded" />
            <span className="text-xs">BLAQQ</span>
          </Button>
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

export default Blog;

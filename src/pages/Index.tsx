import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import HeroSection from "@/components/shared/HeroSection";
import CategoryFilter from "@/components/shared/CategoryFilter";
import ReelsSection from "@/components/messages/ReelsSection";
import BottomNavigation from "@/components/shared/BottomNavigation";
import SpecialistGrid from "@/components/shared/SpecialistGrid";
import FloatingActionButton from "@/components/shared/FloatingActionButton";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Graphic", "UX/UI", "Photo", "SMM", "Animation"];
  
  // Mock reels data for main screen
  const reels = [
    {
      id: 1,
      user: { name: "Sarah Chen", username: "@sarahchen", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "Logo Design Process"
    },
    {
      id: 2,
      user: { name: "Alex Rodriguez", username: "@alexdesigns", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "UI Animation"
    },
    {
      id: 3,
      user: { name: "Maya Patel", username: "@mayacreates", avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" },
      thumbnail: "/lovable-uploads/fc346fb7-82bf-45e7-94ac-8bcadd2d716b.png",
      title: "Brand Identity"
    }
  ];
  
  const specialists = [
    {
      id: 1,
      name: "Tahmina Mustafayeva",
      username: "@tahmina.m",
      skills: "UX/UI, SMM",
      rating: 4.8,
      reviews: 127,
      status: "Free",
      price: "800$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: true,
      languages: "AZ - 5, RU - 4, EN - 4.5"
    },
    {
      id: 2,
      name: "Ruslan Mustafayev",
      username: "@ruslan.m",
      skills: "UX/UI, Graphic",
      rating: 4.6,
      reviews: 98,
      status: "Busy",
      price: "1200$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: true,
      languages: "AZ - 5, RU - 4, EN - 4"
    },
    {
      id: 3,
      name: "Seadet Sherifova",
      username: "@seadet.s",
      skills: "Graphic, SMM",
      rating: 4.9,
      reviews: 156,
      status: "Free",
      price: "600$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: false,
      languages: "AZ - 5, RU - 5, EN - 3"
    }
  ];

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           specialist.skills.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const rightContent = (
    <Link to="/profile">
      <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
        <AvatarImage src="/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <PageHeader showSettings rightContent={rightContent} />
      
      <ReelsSection reels={reels} />

      <HeroSection
        title={
          <>
            Find the Perfect <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative</span> Professional
          </>
        }
        subtitle="Connect with talented specialists across design, development, and digital marketing. Build your dream team today."
        searchPlaceholder="Search for specialists, skills, or services..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <SpecialistGrid 
        specialists={filteredSpecialists}
        title="Artists"
      />

      <FloatingActionButton />
      <BottomNavigation activeTab="main" />
    </div>
  );
};

export default Index;


import { useState, useEffect } from "react";

interface Specialist {
  id: number;
  name: string;
  username: string;
  skills: string;
  rating: number;
  reviews: number;
  status: string;
  price: string;
  avatar: string;
  isNew: boolean;
  languages: string;
  experience: string;
  profileImage: string;
}

export const useSpecialists = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - in real app this would come from Supabase
  const mockSpecialists: Specialist[] = [
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
      profileImage: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: true,
      languages: "AZ - 5, RU - 4, EN - 4.5",
      experience: "5+ years"
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
      profileImage: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: true,
      languages: "AZ - 5, RU - 4, EN - 4",
      experience: "3+ years"
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
      profileImage: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: false,
      languages: "AZ - 5, RU - 5, EN - 3",
      experience: "4+ years"
    },
    {
      id: 4,
      name: "Ahmad Hassan",
      username: "@ahmad.h",
      skills: "Web Development, React",
      rating: 4.7,
      reviews: 89,
      status: "Free",
      price: "1000$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      profileImage: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: false,
      languages: "EN - 5, AR - 5, RU - 3",
      experience: "6+ years"
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      username: "@maria.r",
      skills: "Animation, Motion Graphics",
      rating: 4.9,
      reviews: 203,
      status: "Busy",
      price: "1500$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      profileImage: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: true,
      languages: "EN - 5, ES - 5, FR - 4",
      experience: "7+ years"
    },
    {
      id: 6,
      name: "Chen Wei",
      username: "@chen.w",
      skills: "Photo, Video Editing",
      rating: 4.5,
      reviews: 67,
      status: "Free",
      price: "700$+",
      avatar: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      profileImage: "/lovable-uploads/9002bb8b-998f-4e7c-b2ba-019b5a4342c3.png",
      isNew: false,
      languages: "EN - 4, ZH - 5, JA - 3",
      experience: "2+ years"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchSpecialists = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSpecialists(mockSpecialists);
      } catch (err) {
        setError("Failed to load specialists");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  return { specialists, isLoading, error };
};

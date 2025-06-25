
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserTypeProvider } from "@/contexts/UserTypeContext";
import { FavoritesProvider } from "@/components/shared/FavoritesProvider";
import UserTypeSelector from "@/components/shared/UserTypeSelector";
import { useUserType } from "@/contexts/UserTypeContext";
import Index from "./pages/Index";
import SpecialistProfile from "./pages/SpecialistProfile";
import Catalog from "./pages/Catalog";
import Announcements from "./pages/Announcements";
import Messages from "./pages/Messages";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { userType } = useUserType();

  if (!userType) {
    return <UserTypeSelector />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/specialist/:id" element={<SpecialistProfile />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserTypeProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </FavoritesProvider>
      </UserTypeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

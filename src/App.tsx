
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserTypeProvider } from "@/contexts/UserTypeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/components/shared/FavoritesProvider";
import UserTypeSelector from "@/components/shared/UserTypeSelector";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useUserType } from "@/contexts/UserTypeContext";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  if (!userType) {
    return <UserTypeSelector />;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/specialist/:id" element={
        <ProtectedRoute>
          <SpecialistProfile />
        </ProtectedRoute>
      } />
      <Route path="/catalog" element={
        <ProtectedRoute>
          <Catalog />
        </ProtectedRoute>
      } />
      <Route path="/announcements" element={
        <ProtectedRoute>
          <Announcements />
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <UserTypeProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </FavoritesProvider>
        </UserTypeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

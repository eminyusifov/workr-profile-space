
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";
import JobPostingForm from "@/components/announcements/JobPostingForm";

const Announcements = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Announcements" showBackButton />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <JobPostingForm />
        </div>

        <BottomNavigation activeTab="announcements" />
      </div>
    </ThemeProvider>
  );
};

export default Announcements;

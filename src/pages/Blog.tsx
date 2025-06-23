
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageHeader from "@/components/shared/PageHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";

const Blog = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PageHeader title="Blog" showBackButton />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay tuned for the latest news and updates from our platform.
            </p>
          </div>
        </div>

        <BottomNavigation activeTab="blog" />
      </div>
    </ThemeProvider>
  );
};

export default Blog;

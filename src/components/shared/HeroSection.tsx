
import EnhancedSearch from "./EnhancedSearch";

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  searchPlaceholder = "Search...", 
  searchValue, 
  onSearchChange,
  className = ""
}: HeroSectionProps) => {
  return (
    <section className={`relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}>
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
          {title}
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {subtitle}
        </p>
        
        <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <EnhancedSearch
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            showTrending={true}
          />
        </div>

        {/* CTA Section */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <p className="text-sm text-gray-500 mb-4">Join thousands of successful collaborations</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>1000+ Active Specialists</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>98% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

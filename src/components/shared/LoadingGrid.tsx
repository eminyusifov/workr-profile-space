
import SpecialistCardSkeleton from "./SpecialistCardSkeleton";

interface LoadingGridProps {
  count?: number;
  title?: string;
}

const LoadingGrid = ({ count = 6, title = "Loading..." }: LoadingGridProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <SpecialistCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingGrid;

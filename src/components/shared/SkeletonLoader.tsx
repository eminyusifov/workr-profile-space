
const SkeletonLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg h-4 w-full mb-2"></div>
      <div className="bg-gray-200 rounded-lg h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-200 rounded-lg h-4 w-1/2"></div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border-0 p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-200 rounded-full h-12 w-12"></div>
        <div className="flex-1">
          <div className="bg-gray-200 rounded h-4 w-1/2 mb-2"></div>
          <div className="bg-gray-200 rounded h-3 w-1/3"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-gray-200 rounded h-3 w-full"></div>
        <div className="bg-gray-200 rounded h-3 w-3/4"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

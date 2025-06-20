
import { Button } from "@/components/ui/button";
import SupplierCard from "./SupplierCard";

interface Supplier {
  id: number;
  name: string;
  username: string;
  rating: number;
  reviews: number;
  category: string;
  price: string;
  status: string;
  workStatus: string;
  languages: string[];
  tools: string[];
  avatar: string;
  completedProjects: number;
  responseTime: string;
  description: string;
  verified: boolean;
}

interface SuppliersGridProps {
  suppliers: Supplier[];
  showLeaderboard: boolean;
  favoriteSuppliers: number[];
  onToggleFavorite: (id: number) => void;
}

const SuppliersGrid = ({ suppliers, showLeaderboard, favoriteSuppliers, onToggleFavorite }: SuppliersGridProps) => {
  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div>
        <p className="text-gray-600">
          {suppliers.length} suppliers found
          {showLeaderboard && " • Sorted by rating"}
        </p>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier, index) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            index={index}
            showRanking={showLeaderboard}
            isFavorite={favoriteSuppliers.includes(supplier.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Suppliers
        </Button>
      </div>
    </div>
  );
};

export default SuppliersGrid;

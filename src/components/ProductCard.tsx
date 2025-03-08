import { Link } from "react-router-dom";
import { ProductResponse } from "../types/ProductResponse";
import { useState } from "react";

interface ProductCardProps {
  product: ProductResponse;
}

function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white h-[300px] w-[280px] flex flex-col gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all p-3 border border-gray-400"
    >
      {imageError ? (
        <div className="h-[200px] w-full flex items-center justify-center bg-gray-300 object-cover rounded-t-xl">
          <span className="text-gray-500">이미지가 없습니다</span>
        </div>
      ) : (
        <img
          className="h-[200px] w-full object-cover rounded-t-xl"
          src={product.image}
          alt={product.name}
          onError={handleImageError}
        />
      )}
      <span className="text-lg font-semibold text-gray-800">
        {product.name}
      </span>
      <span className="font-semibold text-gray-800">
        {product.price}원
      </span>
      <span className="text-sm text-gray-500">{product.sellerName}</span>
    </Link>
  );
}

export default ProductCard;

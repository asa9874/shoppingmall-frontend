import { Link } from "react-router-dom";
import { ProductResponse } from "../../types/ProductResponse";

interface SearchProductProps {
  product: ProductResponse;
}

function SearchProduct({ product }: SearchProductProps) {
  return (
    <Link
    to={`/product/${product.id}`} className="flex items-center mt-4 flex-col">
      <div className="w-40 h-40 bg-gray-300 rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full  rounded-md"
        />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-sm text-gray-500">가격: {product.price}원</p>
      </div>
    </Link>
  );
}

export default SearchProduct;

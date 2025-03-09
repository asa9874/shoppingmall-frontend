import { ProductResponse } from "../../types/ProductResponse";
import ProductCard from "../ProductCard";

interface ProductDetailSellerProductsProps {
    product: ProductResponse
}
function ProductDetailSellerProducts({ product }: ProductDetailSellerProductsProps) {
    return (
        <div className="mt-6 flex flex-col gap-4 h-[400px]">
            <h1>판매자 OOO의 다른제품</h1>
            <div className=" h-full flex gap-4">
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            </div>
        </div>
    )
}

export default ProductDetailSellerProducts;
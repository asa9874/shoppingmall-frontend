import { useEffect, useState } from "react";
import { getSellerProducts } from "../../apis/seller";
import { ProductResponse } from "../../types/ProductResponse";
import ProductCard from "../ProductCard";

interface ProductDetailSellerProductsProps {
    sellerMemberId: number;
}
function ProductDetailSellerProducts({ sellerMemberId }: ProductDetailSellerProductsProps) {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    useEffect(() => {
        const fetchSellerProducts = async () => {
            try {
                const data = await getSellerProducts(sellerMemberId,5);
                setProducts(data);
            } catch (error) {
                console.error("판매자의 상품을 불러오는 데 실패했습니다.", error);
            }
        };
        fetchSellerProducts();
    }, [sellerMemberId]);

    return (
        <div className="mt-6 flex flex-col gap-4 h-[400px]">
            <h1>판매자 OOO의 다른제품</h1>
            <div className=" h-full flex gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        </div>
    )
}

export default ProductDetailSellerProducts;
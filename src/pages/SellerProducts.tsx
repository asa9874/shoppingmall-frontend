import { useEffect, useState } from "react";
import { getSellerProducts } from "../apis/seller";
import SellerCard from "../components/SellerCard";
import { useAuthStore } from "../store/useAuthStore";
import { ProductResponse } from "../types/ProductResponse";

function SellerProducts() {
    const [sellerProduct, setSellerProduct] = useState<ProductResponse[]>([]);
    const { id } = useAuthStore();
    useEffect(() => {
        const fetchOrderProduct = async () => {
            try {
                if (!id) return;
                const data = await getSellerProducts(id);
                setSellerProduct(data);
            } catch (error) {
            }
        }
        fetchOrderProduct();
        
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
            <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
            <span className="text-2xl font-bold">올린상품</span>
            {sellerProduct.map((sellerProduct) => (
                <SellerCard key={String(sellerProduct.id)} sellerProduct={sellerProduct} />
            ))}
            </div>
        </div>
    )
}

export default SellerProducts;
import { useEffect, useState } from "react";
import { getProducts } from "../apis/product";
import ProductCard from "../components/ProductCard";
import { ProductResponse } from "../types/ProductResponse";


function Home() {
    const [products, setProducts] = useState<ProductResponse[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(20);
                setProducts(data);
            } catch (error) {
                console.error("상품 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchProducts();
        console.log(products);
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="bg-white mt-10 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800">
                    너에게 추천하는 제품!!!!
                </h2>
                <div className="bg-white min-h-[250px] flex gap-10 px-6 py-4 overflow-x-auto scrollbar-hide">
                    {products.map((product) => (
                        <ProductCard key={String(product.id)} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;
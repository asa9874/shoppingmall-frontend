import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../apis/getProducts";
import { ProductInfo } from "../types/ProductInfo";

function ProductContainer(){
    const [products, setProducts] = useState<ProductInfo[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(2); 
                setProducts(data); 
            } catch (error) {
                console.error('상품 데이터를 가져오는 중 오류 발생:', error);
            }
        };
        
        fetchProducts(); 
        console.log(products)
    }, []);



    return(
        <div className="bg-white mt-10">
            <span>너에게 추천하는 제품!!!!</span>
            <div className="bg-white h-[250px] flex gap-10 p-5 ">
            {products.map((product) => (
                <ProductCard key={String(product.id)} product={product} />
            ))}
            </div>
        </div>
    )
}

export default ProductContainer;
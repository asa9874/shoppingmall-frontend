import { useEffect, useState } from "react";
import { getProducts } from "../apis/product";
import ProductCard from "../components/ProductCard";
import { ProductResponse } from "../types/ProductResponse";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSlider from "../components/Home/HomeSlider";
import HomeCategory from "../components/Home/HomeCategory";

function Home() {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(10);
        setProducts(data);
      } catch (error) {
        console.error("상품 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchProducts();
    console.log(products);
  }, []);



  return (
    <div className="min-h-screen p-10 flex flex-col gap-10 items-center">
      <HomeSlider />
      <HomeCategory />
      <div className="bg-white mt-10 rounded-xl shadow-lg p-6 w-[1600px]">
        <h2 className="text-xl font-bold text-gray-800">
          전자제품
        </h2>
        <div className="bg-white min-h-[280px] gap-10 px-6 py-4 overflow-x-auto scrollbar-hide grid grid-cols-5">
          {products.map((product) => (
            <ProductCard key={String(product.id)} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

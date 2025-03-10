import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchParams, searchProducts } from "../apis/product";
import SearchProduct from "../components/Search/SearchProduct";
import { ProductResponse } from "../types/ProductResponse";

const categories = [
  "ELECTRONICS",
  "FASHION",
  "HOME",
  "BEAUTY",
  "FOOD",
  "SPORTS",
  "TOYS",
  "BOOKS",
  "AUTOMOTIVE",
  "PETS",
  "ETC",
];

function ProductSearch() {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [page, setPage] = useState(searchParams.get("page") || "0");
  const [count, setCount] = useState(searchParams.get("count") || "10");
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    // 쿼리 파라미터가 변경될 때마다 상태를 업데이트합니다.
    setKeyword(searchParams.get("keyword") || "");
    setCategory(searchParams.get("category") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setPage(searchParams.get("page") || "0");
    setCount(searchParams.get("count") || "10");
  }, [searchParams]);

  const handleSearch = async () => {
    // 검색 버튼을 클릭했을 때 쿼리 파라미터를 업데이트합니다.
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("page", page);
    params.set("count", count);
    window.history.replaceState(null, "", `?${params.toString()}`);
    const searchParams: SearchParams = {
      keyword,
      category,
      minPrice,
      maxPrice,
      page,
      count,
    };
    const results = await searchProducts(searchParams);
    setProducts(results);
    console.log(results);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 flex p-5">
      <div className="w-[300px] h-screen rounded-md bg-green-500 mr-1 sticky top-0 p-4">
        <div className="mt-4">
          <label className="block text-white">카테고리</label>
          <select
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">전체</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-white">최소 가격</label>
          <input
            type="number"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-white">최대 가격</label>
          <input
            type="number"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white min-h-screen w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">상품검색</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="상품 이름을 입력하세요"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md ml-2 text-sm"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
        <h2 className="text-xl font-bold">검색 결과 {products.length}개</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <SearchProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSearch;

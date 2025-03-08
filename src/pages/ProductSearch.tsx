import SearchProduct from "../components/Search/SearchProduct";

function ProductSearch() {
    
  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 py-6 flex p-5 ">
        <div className="w-[300px] h-screen rounded-md bg-black mr-1 sticky top-0">
          <span className="text-cyan-200">사이드바</span>
        </div>
        <div className="bg-white min-h-screen w-full p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">상품검색</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="상품 이름을 입력하세요"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button className="bg-blue-500 text-white p-2 rounded-md ml-2 text-sm">
              검색
            </button>
          </div>
          <h2 className="text-xl font-bold">검색 결과 O개</h2>

          <div className="mt-6 grid grid-cols-6 gap-4">
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
            <SearchProduct />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSearch;

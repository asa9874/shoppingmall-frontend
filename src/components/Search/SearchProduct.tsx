function SearchProduct() {
  return (
    <div className="flex items-center mt-4 flex-col">
      <div className="w-40 h-40 bg-gray-300 rounded-md"></div>
      <div className="ml-4">
        <h3 className="text-lg font-bold">상품 이름</h3>
        <p className="text-sm text-gray-500">상품 설명</p>
        <p className="text-sm text-gray-500">가격: 10000원</p>
      </div>
    </div>
  );
}

export default SearchProduct;

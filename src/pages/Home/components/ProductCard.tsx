function ProductCard(){
    return(
        <div className="h-full bg-blue-100 w-[200px] flex flex-col gap-1">
            <div className="h-3/4 w-full bg-yellow-100">이미지</div>
            <span>제품이름</span>
            <span>판매자</span>
        </div>
    )
}

export default ProductCard;
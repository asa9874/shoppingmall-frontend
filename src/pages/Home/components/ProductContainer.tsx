import ProductCard from "./ProductCard";

function ProductContainer(){
    return(
        <div className="bg-white mt-10">
            <span>너에게 추천하는 제품!!!!</span>
            <div className="bg-white h-[250px] flex gap-10 p-5 ">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    )
}

export default ProductContainer;
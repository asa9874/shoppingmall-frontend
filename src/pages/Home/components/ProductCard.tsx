import { ProductInfo } from '../types/ProductInfo';  

interface ProductCardProps {
    product: ProductInfo; 
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="h-full bg-blue-100 w-[200px] flex flex-col gap-1">
            <img className="h-3/4 w-full bg-yellow-100" src={product.image}></img>
            <span>{product.name}</span>
            <span>{product.sellerName}</span> 
        </div>
    );
}

export default ProductCard;

import { ProductInfo } from '../types/ProductInfo';  

interface ProductCardProps {
    product: ProductInfo; 
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="h-full bg-white w-[200px] flex flex-col gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all p-3 border border-gray-400">
            <img 
                className="h-3/4 w-full object-cover rounded-t-xl" 
                src={product.image} 
                alt={product.name}
            />
            <span className="text-lg font-semibold text-gray-800">{product.name}</span>
            <span className="text-sm text-gray-500">{product.sellerName}</span> 
        </div>
    );
}


export default ProductCard;

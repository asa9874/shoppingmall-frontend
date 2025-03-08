import { Link } from "react-router-dom";
import { deleteSellerProduct } from "../apis/seller";
import { useAuthStore } from "../store/useAuthStore";
import { ProductResponse } from "../types/ProductResponse";

interface SellerCardProps {
    sellerProduct: ProductResponse;
}

function SellerCard({ sellerProduct }: SellerCardProps) {
    const {id} = useAuthStore();

    const handleDeleteProduct = async () => {
        if (!id) return;
        await deleteSellerProduct(id, sellerProduct.id);
    }
    return (
        <div>
            <Link
                to={`/product/${sellerProduct.id}`}
                className="h-[300px] bg-white flex gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all p-3 border border-gray-400"
            >
                <img
                    className="w-1/3 h-full  rounded-lg"
                    src={sellerProduct.image}
                    alt={sellerProduct.name}
                />
                <div className="flex flex-col w-full bg-blue-100 p-2 ">
                    <span className="text-lg font-semibold text-gray-800">
                        {sellerProduct.name}
                    </span>
                    <span className="text-sm text-gray-500">{sellerProduct.sellerName}</span>
                    <span className="text-sm text-gray-500">{sellerProduct.category}</span>
                    <span className="text-sm text-gray-500">{sellerProduct.description}</span>
                    <span className="text-sm text-gray-500">{sellerProduct.price}원</span>
                    <span className="text-sm text-gray-500">수량: {sellerProduct.stock}</span>
                </div>
            </Link>
            <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white p-2 rounded-lg"
            >
                삭제
            </button>
        </div>
    );
}

export default SellerCard;

import { Link } from "react-router-dom";
import { deleteProductFromCart } from "../apis/cart";
import { useAuthStore } from "../store/useAuthStore";
import { CartItemResponse } from "../types/CartItemResponse";

interface CartCardProps {
    cartProduct: CartItemResponse;
}

function CartCard({ cartProduct }: CartCardProps) {
    const {id} = useAuthStore();

    const handleDeleteCart = async () => {
        if (!id) return;
        await deleteProductFromCart(id, cartProduct.id);
    }
    return (
        <div>
            <Link
                to={`/product/${cartProduct.productid}`}
                className="h-[300px] bg-white flex gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all p-3 border border-gray-400"
            >
                <img
                    className="w-1/3 h-full object-cover rounded-lg"
                    src={cartProduct.image}
                    alt={cartProduct.name}
                />
                <div className="flex flex-col w-full bg-blue-100 p-2 ">
                    <span className="text-lg font-semibold text-gray-800">
                        {cartProduct.name}
                    </span>
                    <span className="text-sm text-gray-500">{cartProduct.sellerName}</span>
                    <span className="text-sm text-gray-500">{cartProduct.category}</span>
                    <span className="text-sm text-gray-500">{cartProduct.description}</span>
                    <span className="text-sm text-gray-500">{cartProduct.price}원</span>
                    <span className="text-sm text-gray-500">수량: {cartProduct.quantity}</span>
                </div>
            </Link>
            <button
                onClick={handleDeleteCart}
                className="bg-red-500 text-white p-2 rounded-lg"
            >
                삭제
            </button>
        </div>
    );
}

export default CartCard;

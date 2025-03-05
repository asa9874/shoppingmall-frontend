import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { OrderItemResponse } from "../types/OrderItemResponse";

interface OrderCardProps {
    OrderProduct: OrderItemResponse;
}

function OrderCard({ OrderProduct }: OrderCardProps) {
    const { id } = useAuthStore();
    console.log(OrderProduct);
    return (
        <Link
            to={`/customer/${id}/orders/${OrderProduct.id}`}
            className="h-[300px] bg-white flex gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all p-3 border border-gray-400"
        >
            <img
                className="w-1/3 h-full object-cover rounded-lg"
                src={OrderProduct.image}
                alt={OrderProduct.name}
            />
            <div className="flex flex-col w-full bg-blue-100 p-2 ">
                <span className="text-lg font-semibold text-gray-800">
                    {OrderProduct.name}
                </span>
                <span className="text-sm text-gray-500">{OrderProduct.sellerName}</span>
                <span className="text-sm text-gray-500">{OrderProduct.category}</span>
                <span className="text-sm text-gray-500">{OrderProduct.description}</span>
                <span className="text-sm text-gray-500">{OrderProduct.price}원</span>
                <span className="text-sm text-gray-500">수량: {OrderProduct.quantity}</span>
                <span className="text-sm text-gray-500">주문일자: {OrderProduct.orderDate}</span>
            </div>
        </Link>
    );
}

export default OrderCard;

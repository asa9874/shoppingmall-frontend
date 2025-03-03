import { useEffect, useState } from "react";
import { getOrderProducts } from "../apis/getOrderProducts";
import OrderCard from "../components/OrderCard";
import { useAuthStore } from "../store/useAuthStore";
import { OrderItemResponse } from "../types/OrderItemResponse";

function Orders() {
    const [orderProduct, setOrderProduct] = useState<OrderItemResponse[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useAuthStore();
    useEffect(() => {
        const fetchOrderProduct = async () => {
            try {
                if (!id) return;
                const data = await getOrderProducts(id);
                setOrderProduct(data);
            } catch (error) {
            }
        }
        fetchOrderProduct();
        
    }, []);

    useEffect(() => {
        if (orderProduct.length === 0) return;
        const total = orderProduct.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
    }, [orderProduct]);

    return (
        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
            <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
            <span className="text-2xl font-bold">주문상품목록</span>
            <span>${totalPrice}</span>
            {orderProduct.map((orderProduct) => (
                <OrderCard key={String(orderProduct.productid)} OrderProduct={orderProduct} />
            ))}
            </div>
        </div>
    )
}

export default Orders;
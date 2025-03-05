import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "../apis/order";
import { useAuthStore } from "../store/useAuthStore";
import { OrderItemResponse } from "../types/OrderItemResponse";

function OrderDetail() {
    const { id } = useAuthStore();
    const { orderId } = useParams<{ orderId: string }>();
    const [orderDetail, setOrderDetail] = useState<OrderItemResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const data = await getOrderDetail(id, Number(orderId));
                setOrderDetail(data);
            } catch (error) {
                console.error("주문 상세 정보를 가져오는 중 오류 발생:", error);
            }
        };
        fetchData();
    }, [id, orderId]);

    if (!orderDetail) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
            <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-5">주문 상세 정보</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">주문 ID</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.id}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 이름</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 이미지</label>
                        <img src={orderDetail.image} alt={orderDetail.name} className="mt-1 w-full h-auto border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 설명</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.description}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 가격</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.price}원</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 재고</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.stock}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">판매자 이름</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.sellerName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 카테고리</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.category}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">주문 수량</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.quantity}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">주문 날짜</label>
                        <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{orderDetail.orderDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
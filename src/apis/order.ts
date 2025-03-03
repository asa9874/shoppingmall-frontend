import { BASE_URL } from "../context/baseURL";
import { OrderItemResponse } from "../types/OrderItemResponse";
import apiClient from "./apiClient";

export const getOrderProducts = async (memberId: number): Promise<OrderItemResponse[]> => {
  const token = localStorage.getItem("token");
  if (!token) return [];
  try {
    const response = await apiClient.get(`/customer/${memberId}/orders`);
    const items = response.data;
    console.log(items, "주문 정보");

    return items.map((item: OrderItemResponse) => ({
      productid: item.productid,
      name: item.name,
      image: `${BASE_URL}` + item.image,
      description: item.description,
      price: item.price,
      stock: item.stock,
      sellerName: item.sellerName,
      category: item.category,
      quantity: item.quantity,
      orderDate: item.orderDate
    }));

  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};


//TODO: 이거 BACKEND에서 아직 PATHvariable로 받아오는거에서 안바꿔서 작동안함
export const addProductToOrder = async (memberId: number, productId: number, quantity: number) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    await apiClient.post(`/customer/${memberId}/orders/${productId}`, {
      quantity
    });
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}

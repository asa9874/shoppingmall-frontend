import { BASE_URL } from "../context/baseURL";
import { OrderItemResponse } from "../types/OrderItemResponse";
import apiClient from "./apiClient";

export const getOrderProducts = async (memberId: number): Promise<OrderItemResponse[]> => {
    const token = localStorage.getItem("token");
    if(!token) return [];
    try {
      const response = await apiClient.get(`/customer/${memberId}/orders`);
      const items = response.data;  
      console.log(items, "주문 정보");
  
      return items.map((item: OrderItemResponse) => ({
        productid: item.productid,
        name: item.name,
        image: `${BASE_URL}`+item.image,
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
import axios from "axios";
import { BASE_URL } from "../context/baseURL";
import { OrderItemResponse } from "../types/OrderItemResponse";

export const getOrderProducts = async (memberId: number): Promise<OrderItemResponse[]> => {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/customer/${memberId}/orders`;
    if(!token) {return [];}
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
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
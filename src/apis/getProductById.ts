import { BASE_URL } from "../context/baseURL";
import { ProductResponse } from "../types/ProductResponse";
import apiClient from "./apiClient";

export const getProductById = async (
    productId: number
  ): Promise<ProductResponse> => {  
  
    try {
      const response = await apiClient.get(`${BASE_URL}/product/${productId}`);
      const item = response.data;  
      console.log(item, "상품 상세 정보");
  
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        sellerName: item.sellerName,
        image: `${BASE_URL}`+item.image,
        category: item.category,
      };
      
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  };
  

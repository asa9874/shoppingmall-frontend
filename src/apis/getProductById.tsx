import axios from "axios";
import { ProductResponse } from "../types/ProductResponse";
import { BASE_URL } from "../context/baseURL";

export const getProductById = async (
    productId: number
  ): Promise<ProductResponse> => {  
    const url = `${BASE_URL}/product/${productId}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const item = response.data;  
      console.log(item, "상품 상세 정보");
  
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        sellerName: item.sellerName,
        image: BASE_URL+"/images/"+item.image,
        category: item.category,
      };
      
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  };
  

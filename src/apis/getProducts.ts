import axios from "axios";
import { BASE_URL } from "../context/baseURL";
import { ProductResponse } from "../types/ProductResponse";

export const getProducts = async (
  count: Number
): Promise<ProductResponse[]> => {
  const url = `${BASE_URL}/product/?count=${count}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const items = response.data;
    console.log(items, "asdas");
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map((item: ProductResponse) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      sellerName: item.sellerName,
      image: `${BASE_URL}`+item.image,
      category: item.category,
    }));
    
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

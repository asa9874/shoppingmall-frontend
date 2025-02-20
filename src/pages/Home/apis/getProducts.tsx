import axios from 'axios';
import { ProductInfo } from '../types/ProductInfo';
import { BASE_URL } from '../context/baseURL';

export const getProducts = async (
    count:Number
): Promise<ProductInfo[]> => {
  const url = `${BASE_URL}/product/?count=${count}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const items = response.data;
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map((item: ProductInfo) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        sellerName: item.sellerName,
        image:item.image,
    }));
    
  } catch (error) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};

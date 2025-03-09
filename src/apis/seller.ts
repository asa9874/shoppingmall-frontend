import { BASE_URL } from "../context/baseURL";
import { ProductResponse } from "../types/ProductResponse";
import apiClient from "./apiClient";

export const getSellerProducts = async (
  memberId: Number,
  count: Number | null = null
): Promise<ProductResponse[]> => {
  const token = localStorage.getItem("token");
  if (!token) return [];
  try {
    let url;
    if (count) {
      url = `/seller/${memberId}/products?count=${count}`;
    } else {
      url = `/seller/${memberId}/products`;
    }
    const response = await apiClient.get(url);
    const items = response.data;
    console.log(items, "상품들 정보");
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map((item: ProductResponse) => ({
      memberId: item.memberId,
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      sellerName: item.sellerName,
      image: `${BASE_URL}` + item.image,
      category: item.category,
    }));

  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};



export const deleteSellerProduct = async (
  memberId: Number,
  productId: Number
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await apiClient.delete(`/seller/${memberId}/product/${productId}`);
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};


export const addProduct = async (
  memberId: Number,
  formData: FormData
) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await apiClient.post(`/seller/${memberId}/product/create`, formData);
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}


export const updateProduct = async (
  memberId: Number,
  productId: Number,
  formData: FormData
) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await apiClient.put(`/seller/${memberId}/product/${productId}`, formData);
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}
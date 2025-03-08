import { ReviewResponse } from "../types/ReviewResponse";
import apiClient from "./apiClient";

export const getReviews = async (
  productId: number
): Promise<ReviewResponse[]> => {
  const response = await apiClient.get(`/product/${productId}/reviews`);
  const items = response.data.content;
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item: ReviewResponse) => ({
    id: item.id,
    productName: item.productName,
    customerName: item.customerName,
    content: item.content,
    rating: item.rating,
  }));
};



export const createReview = async (
  productId: Number,
  memberId: Number,
  content: string,
  rating: Number
) => {
  console.log(productId, memberId, content, rating);
  const response = await apiClient.post("/review", {
    productId: productId,
    memberId: memberId,
    content: content,
    rating: rating,
  });
  return response.data;
};

export const deleteReview = async (reviewId: number) => {
  const response = await apiClient.delete(`/review/${reviewId}`);
  return response.data;
};

export const updateProduct = async () => {};

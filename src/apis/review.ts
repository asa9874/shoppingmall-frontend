import { Review } from "../types/Review";
import apiClient from "./apiClient";

export const getReviews = async (productId: string): Promise<Review[]> => {
    const response = await apiClient.get(`/reviews?productId=${productId}`);
    const items = response.data;
    if (!Array.isArray(items)) {
        return [];
    }
    return items.map((item: Review) => ({
        id: item.id,
        productId: item.productId,
        memberId: item.memberId,
        content: item.content,
        rating: item.rating,
    }));
}

export const createReview = async (review: Review) => {
    const response = await apiClient.post("/reviews", review);
    return response.data;
}

export const deleteReview = async (reviewId: string) => {
    const response = await apiClient.delete(`/reviews/${reviewId}`);
    return response.data;
}


export const updateProduct= async () => {
}
import { useEffect, useState } from "react";
import { createReview, getReviews } from "../../apis/review";
import { useAuthStore } from "../../store/useAuthStore";
import { ProductResponse } from "../../types/ProductResponse";
import { ReviewResponse } from "../../types/ReviewResponse";
import ReviewCard from "../ReviewCard";

interface ReviewProps {
    product: ProductResponse | null;
}

function Review({ product }: ReviewProps) {
    const [reviewContent, setReviewContent] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [reviews, setReviews] = useState<ReviewResponse[]>([]);
    const { id,role } = useAuthStore();

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !product) return;
        try {
            await createReview(product.id, id, reviewContent, reviewRating);
            setReviewContent("");
            setReviewRating(0);
            const updatedReviews = await getReviews(product.id);
            setReviews(updatedReviews);
        } catch (error) {
            console.error("리뷰를 작성하는 데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        const fetchProductReview = async () => {
            if (product) {
                try {
                    const data = await getReviews(Number(product.id));
                    setReviews(data);
                    console.log(data);
                } catch (error) {
                    console.error("리뷰를 불러오는 데 실패했습니다.", error);
                }
            }
        };
        fetchProductReview();
    }, [product]);

    return (
        <div className="mt-6">
            리뷰
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
            {id && role === "CUSTOMER" && (
                <form onSubmit={handleReviewSubmit}>
                    <div className="w-full bg-gray-200 h-[200px] rounded-xl flex flex-col p-2 mt-3">
                        <input
                            type="text"
                            placeholder="리뷰를 작성해주세요"
                            className="w-full h-3/4 mt-2 ml-2 rounded-xl p-4"
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="평점을 입력해주세요 (1-5)"
                            className="w-full h-1/4 mt-2 ml-2 rounded-xl p-4"
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                            min="1"
                            max="5"
                        />
                        <button
                            type="submit"
                            className="w-1/4 h-1/4 bg-blue-600 text-white rounded-xl mt-2 ml-2"
                        >
                            작성
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Review
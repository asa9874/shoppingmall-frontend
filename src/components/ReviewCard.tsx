import { ReviewResponse } from "../types/ReviewResponse";

interface ReviewCardProps {
    review: ReviewResponse;
}


function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className='w-full bg-gray-200 h-[100px] rounded-xl flex flex-col p-2 mt-3'>
            <span>{review.customerName}</span>
            <span className='w-full h-3/4 mt-2 ml-2'>{review.content}</span>
            <div>{review.rating}점</div>
        </div>
    )
}

export default ReviewCard
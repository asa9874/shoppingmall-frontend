import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addProductToCart } from "../apis/cart";
import { addProductToOrder } from "../apis/order";
import { getProductById } from "../apis/product";
import { createReview, getReviews } from "../apis/review";
import ReviewCard from "../components/ReviewCard";
import { useAuthStore } from "../store/useAuthStore";
import { ProductResponse } from "../types/ProductResponse";
import { ReviewResponse } from "../types/ReviewResponse";

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [count, setCount] = useState(0);
  const { id, role } = useAuthStore();
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (productId) {
        try {
          const data = await getProductById(Number(productId));
          setProduct(data);
        } catch (error) {
          console.error("상품을 불러오는 데 실패했습니다.", error);
        }
      }
    };
    fetchProductDetail();
  }, [productId]);

  useEffect(() => {
    const fetchProductReview = async () => {
      if (productId) {
        try {
          const data = await getReviews(Number(productId));
          setReviews(data);
          console.log(data);
        } catch (error) {
          console.error("리뷰를 불러오는 데 실패했습니다.", error);
        }
      }
    };
    fetchProductReview();
  }, [productId]);

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

  function handleCountIncrease() {
    if (product && count === product.stock) return;
    setCount(count + 1);
  }

  function handleCountDecrease() {
    if (count === 0) return;
    setCount(count - 1);
  }

  const handleAddToCart = async () => {
    if (!id || !product) return;
    await addProductToCart(id, product.id, count);
  };

  const handleBuyNow = async () => {
    if (!id || !product) return;
    await addProductToOrder(id, product.id, count);
    window.location.href = "/";
  };

  if (!product)
    return <div className="text-center text-xl font-semibold">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen shadow-lg rounded-xl bg-white">
      <div className="flex flex-col md:flex-row items-center gap-6 ">
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-[470px]  rounded-xl shadow-lg"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="w-full md:w-1/2 h-[470px] shadow-sm p-6 rounded-xl bg-slate-100">
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>
          <div className="text-xl text-gray-700 mt-2 border border-black p-2">
            {product.description}
          </div>

          <div className="mt-4">
            <p className="font-semibold text-red-600 text-3xl">
              {product.price}원
            </p>
            <p className="text-lg text-gray-500 mt-10">
              Seller: {product.sellerName}
            </p>
            <p className="text-lg text-gray-500">Stock: {product.stock}</p>
            <p className="text-lg text-gray-500">
              Category: {product.category}
            </p>
          </div>

          <div className="mt-6">
            {id && role === "CUSTOMER" && (
              <>
                <div className="mt-6 flex gap-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full"
                    onClick={handleCountDecrease}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{count}</span>
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full"
                    onClick={handleCountIncrease}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                    onClick={handleAddToCart}
                  >
                    장바구니에 담기
                  </button>
                  <button
                    className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-100 transition-all"
                    onClick={handleBuyNow}
                  >
                    바로구입하기
                  </button>
                </div>
              </>
            )}

            {id && role === "SELLER" && (
              <div>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                  onClick={() => {
                    window.location.href = `/seller/${id}/products/update/${product.id}`;
                  }}
                >
                  상품 수정
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default ProductDetail;

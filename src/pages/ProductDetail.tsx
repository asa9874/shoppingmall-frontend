import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addProductToCart } from '../apis/cart';
import { addProductToOrder } from '../apis/order';
import { getProductById } from '../apis/product';
import ReviewCard from '../components/ReviewCard';
import { useAuthStore } from '../store/useAuthStore';

function ProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<any>(null);
    const [count, setCount] = useState(0);
    const { id, role } = useAuthStore();

    useEffect(() => {
        const fetchProductDetail = async () => {
            if (productId) {
                try {
                    const data = await getProductById(Number(productId));
                    setProduct(data);
                } catch (error) {
                    console.error('상품을 불러오는 데 실패했습니다.', error);
                }
            }
        };
        fetchProductDetail();
    }, [productId]);

    function handleCountIncrease() {
        if (count === product.stock) return;
        setCount(count + 1);
    }

    function handleCountDecrease() {
        if (count === 0) return;
        setCount(count - 1);
    }

    const handleAddToCart = async () => {
        if (!id) return;
        await addProductToCart(id, product.id, count);
    }

    const handleBuyNow = async () => {
        if (!id) return;
        await addProductToOrder(id, product.id, count);
        window.location.href = '/';
    }

    if (!product) return <div className="text-center text-xl font-semibold">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2">
                    <img
                        className="w-full h-auto object-cover rounded-xl shadow-lg"
                        src={product.image}
                        alt={product.name}
                    />
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
                    <p className="text-xl text-gray-700 mt-2">{product.description}</p>

                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-900">Price: ${product.price}</p>
                        <p className="text-lg text-gray-500">Seller: {product.sellerName}</p>
                        <p className="text-lg text-gray-500">Stock: {product.stock}</p>
                        <p className="text-lg text-gray-500">Category: {product.category}</p>
                    </div>
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
                    <div className="mt-6">
                        {id && role === 'CUSTOMER' && (
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
                        )}

                        {id && role === 'SELLER' && (
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
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <form>
                    <div className='w-full bg-gray-200 h-[200px] rounded-xl flex flex-col p-2 mt-3'>
                        <input type="text" placeholder="리뷰를 작성해주세요" className='w-full h-3/4 mt-2 ml-2 rounded-xl p-4' />
                        <button type="submit" className='w-1/4 h-1/4 bg-blue-600 text-white rounded-xl mt-2 ml-2'>작성</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductDetail;

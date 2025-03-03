// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../apis/getProductById';
import { useAuthStore } from '../store/useAuthStore';

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<any>(null);
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
                    </div>
                    <div className="mt-6 flex gap-4">
                        {id && (
                            <div>
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
                                    Add to Cart
                                </button>
                                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-100 transition-all">
                                    Buy Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

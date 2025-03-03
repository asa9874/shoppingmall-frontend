import { useEffect, useState } from "react";
import { getCartProducts } from "../apis/getCartProducts";
import CartCard from "../components/CartCard";
import { useAuthStore } from "../store/useAuthStore";
import { CartItemResponse } from "../types/CartItemResponse";

function Cart() {
    const [cartProduct, setCartProduct] = useState<CartItemResponse[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useAuthStore();
    useEffect(() => {
        const fetchCartProduct = async () => {
            try {
                if (!id) return;
                const data = await getCartProducts(id);
                setCartProduct(data);
            } catch (error) {
                console.error("장바구니 데이터를 가져오는 중 오류 발생:", error);
            }
        }
        fetchCartProduct();
    }, []);


    return (
        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
            <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
            {cartProduct.map((cartProduct) => (
                <CartCard key={String(cartProduct.productid)} cartProduct={cartProduct} />
            ))}
            </div>
        </div>
    )
}

export default Cart;
import { useEffect, useState } from "react";
import { clearCart, getCartProducts } from "../apis/cart";
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

    useEffect(() => {
        if (cartProduct.length === 0) return;
        const total = cartProduct.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
    }, [cartProduct]);

    const handleClearCart = async () => {
        try {
            if (!id) return;
            await clearCart(id);
            setCartProduct([]);
            setTotalPrice(0);
        } catch (error) {
            console.error("장바구니 비우기 중 오류 발생:", error);
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
            <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
            <span className="text-2xl font-bold">장바구니</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md" 
                onClick={handleClearCart}
            >
                장바구니 비우기
            </button>
            <span>${totalPrice}</span>
            {cartProduct.map((cartProduct) => (
                <CartCard key={String(cartProduct.productid)} cartProduct={cartProduct} />
            ))}
            </div>
        </div>
    )
}

export default Cart;
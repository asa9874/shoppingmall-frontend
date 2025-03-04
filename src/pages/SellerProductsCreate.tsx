import { useState } from "react";
import { addProduct } from "../apis/seller";
import { useAuthStore } from "../store/useAuthStore";

const categories = [
    "ELECTRONICS", "FASHION", "HOME", "BEAUTY", "FOOD", "SPORTS", "TOYS", "BOOKS", "AUTOMOTIVE", "PETS", "ETC"
];

function SellerProductsCreate() {
    const { id } = useAuthStore();
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        stock: 0,
        category: categories[0]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        const form = new FormData();
        form.append("name", formData.name);
        form.append("image", formData.image);
        form.append("description", formData.description);
        form.append("price", formData.price.toString());
        form.append("stock", formData.stock.toString());
        form.append("category", formData.category);

        try {
            await addProduct(id, form);
            alert("상품이 성공적으로 등록되었습니다.");
        } catch (error) {
            console.error("상품 등록 중 오류 발생:", error);
            alert("상품 등록에 실패했습니다.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
            <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-5">판매자 상품 등록 페이지</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 이름</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 이미지 URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 설명</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 가격</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 재고</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">상품 카테고리</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md"
                    >
                        상품 등록
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SellerProductsCreate;
export interface OrderItemResponse {
    id: number;                  // 주문 ID
    productid: number;           // 상품 ID
    name: string;                // 상품 이름
    image: string;               // 상품 이미지 URL
    description: string;         // 상품 설명
    price: number;               // 상품 가격
    stock: number;               // 상품 재고
    sellerName: string;          // 판매자 이름 (닉네임)
    category: string;   // 상품 카테고리
    quantity: number;            // 주문 수량
    orderDate: string;           // 주문 날짜 (ISO 8601 형식의 문자열)
}
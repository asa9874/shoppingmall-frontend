import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import './styles/index.css';
import './styles/reset.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProductDetail from './pages/ProductDetail';
import ProductSearch from './pages/ProductSearch';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import SellerProducts from './pages/SellerProducts';

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route element={<Layout />}>
        {/* 홈 페이지 */}
        <Route path="/" element={<Home />} />
        
        {/* 회원 관련 페이지 */}
        <Route path="/member/:memberId" element={<></>} />  
        
        {/* 상품 관련 페이지 */}
        <Route path="/product/:productId" element={<ProductDetail />} />  
        <Route path="/product/search" element={<ProductSearch />} />  

        {/* 장바구니 관련 페이지 */}
        <Route path="/customer/:memberId/cart" element={<Cart />} />  
        
        {/* 주문 관련 페이지 */}
        <Route path="/customer/:memberId/orders" element={<Orders />} /> 
        <Route path="/customer/:memberId/orders/:orderId" element={<OrderDetail />} />  
        
        {/* 판매자 관련 페이지 */}
        <Route path="/seller/:memberId/products" element={<SellerProducts />} />  
      </Route>
      
      {/* 회원가입 페이지 */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import MemberDetail from './pages/MemberDetail';
import MemberUpdate from './pages/MemberUpdate';
import OAuth2Redirect from './pages/OAuth2Redirect';
import OrderDetail from './pages/OrderDetail';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import ProductSearch from './pages/ProductSearch';
import QuestionDetail from './pages/QuestionDetail';
import Questions from './pages/Questions';
import Register from './pages/Register';
import SellerProducts from './pages/SellerProducts';
import SellerProductsCreate from './pages/SellerProductsCreate';
import SellerProductsUpdate from './pages/SellerProductsUpdate';
import './styles/index.css';
import './styles/reset.css';

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route element={<Layout />}>
        {/* 홈 페이지 */}
        <Route path="/" element={<Home />} />
        
        {/* 회원 관련 페이지 */}
        <Route path="/member/:memberId" element={<MemberDetail/>} />  
        <Route path="/member/:memberId/update" element={<MemberUpdate />} />
        
        {/* 상품 관련 페이지 */}
        <Route path="/product/:productId" element={<ProductDetail />} />  
        <Route path="/product/search" element={<ProductSearch />} />  

        {/* 장바구니 관련 페이지 */}
        <Route path="/customer/:memberId/cart" element={<Cart />} />  
        
        {/* 주문 관련 페이지 */}
        <Route path="/customer/:memberId/orders" element={<Orders />} /> 
        <Route path="/customer/:memberId/orders/:orderId" element={<OrderDetail />} />  

        {/* 질문 관련 페이지 */}
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:questionId" element={<QuestionDetail />} />
        
        {/* 판매자 관련 페이지 */}
        <Route path="/seller/:memberId/products" element={<SellerProducts />} />  
        <Route path="/seller/:memberId/products/create" element={<SellerProductsCreate />} />  
        <Route path="/seller/:memberId/products/update/:productId" element={<SellerProductsUpdate />} />  
      </Route>
      
      {/* 회원가입 페이지 */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
    </Routes>
  </Router>
);
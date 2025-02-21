import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import './styles/index.css';
import './styles/reset.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';

createRoot(document.getElementById('root')!).render(
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      <Footer />
    </Router>
)

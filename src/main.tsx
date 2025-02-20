import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import './styles/index.css';
import './styles/reset.css';
import Header from './components/Header';
import Footer from './components/Footer';

createRoot(document.getElementById('root')!).render(
  <>
    <Header/>
    <Home/>
    <Footer/>
  </>,
)

import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import './styles/index.css';
import './styles/reset.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout';

createRoot(document.getElementById('root')!).render(
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
)

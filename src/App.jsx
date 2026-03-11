import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/homePage';
import ListaProdutos from "./pages/productListingPage";
import DetalhesProduto from './pages/DetalhesProduto';
import { CartProvider } from "./contexts/cartContext";
import MeusPedidos from "./pages/meusPedidosPages";
import Checkout from "./pages/Checkout"; 

export default function App() {
  return (
    <BrowserRouter>
      
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          
          <main className="flex-grow">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<ListaProdutos />} />
              <Route path="/produto/:id" element={<DetalhesProduto />} />
              <Route path="/pedidos" element={<MeusPedidos />} />
             <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
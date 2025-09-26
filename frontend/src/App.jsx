import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";  // ✅ FIXED

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderStatus from "./pages/OrderStatus";

function App() {
  return (
  <CartProvider>
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
          <div className="flex-grow">

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-status/:id" element={<OrderStatus />} />
        </Routes>
	  </div>
        <Footer version="v1.0-blue" />
      </div>
    </Router>
  </CartProvider>
  );
}
export default App;

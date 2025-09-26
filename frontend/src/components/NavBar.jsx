import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function NavBar() {
  const { cart } = useContext(CartContext);

  // ✅ Total quantity across all items
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex flex-col md:flex-row md:items-center justify-between shadow">
      {/* Logo + Title + Tagline */}
      <div className="flex items-center space-x-2">
        <img src="/assets/logo.png" alt="FlashScale Logo" className="h-10 w-10" />
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold">FlashScale</span>
          <span className="text-xs md:text-sm text-gray-200">
            Powering Flash Sales Without Crashes 🚀
          </span>
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex items-center w-full md:w-1/2 mt-3 md:mt-0 md:mx-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-2 rounded-l-md border border-gray-300 text-black"
        />
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-r-md">
          Search
        </button>
      </div>

      {/* 🛒 Cart */}
      <Link to="/cart" className="flex items-center space-x-2 mt-3 md:mt-0">
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold">
          Cart ({cartItemCount})
        </button>
      </Link>
    </nav>
  );
}

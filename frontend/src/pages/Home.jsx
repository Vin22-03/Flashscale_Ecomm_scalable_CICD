import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";  // ✅ FIXE

const products = [
  { id: 1, name: "Laptop (Dell Inspiron 15)", mrp: 65000, price: 55000, image: "/assets/laptop.jpg" },
  { id: 2, name: "LED TV (Samsung 43-inch 4K)", mrp: 48000, price: 38000, image: "/assets/tv.jpg" },
  { id: 3, name: "Washing Machine (LG Front Load)", mrp: 42000, price: 32000, image: "/assets/wm.jpg" },
  { id: 4, name: "Refrigerator (Whirlpool Double Door)", mrp: 55000, price: 45000, image: "/assets/fridge.jpg" },
];


export default function Home() {
  const { addToCart, cart } = useContext(CartContext); // Get 'cart' from context

  // ✅ Add this useEffect
  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart])

  // Countdown
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-09-30T23:59:59") - +new Date();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* 🔥 Hero Section: Banner - Logo - Countdown */}
      <div className="flex items-center justify-between px-6 py-6 bg-white shadow-md">
        <div className="w-1/3 flex justify-start">
          <img src="/assets/bigsale.png" alt="Big Sale" className="h-20 md:h-24 object-contain" />
        </div>
        <div className="flex flex-col items-center w-1/3">
          <img src="/assets/logo.png" alt="FlashScale" className="h-30 md:h-40" />
          <p className="text-sm text-gray-600 font-bold">Powering Flash Sales Without Crashes 🚀 -VinCloudOps</p>
        </div>
        <div className="w-1/3 text-right">
          <h2 className="text-lg font-bold text-red-600">⚡ Sale Ends In</h2>
          <div className="text-xl font-mono text-gray-800">
            {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
          </div>
        </div>
      </div>

      {/* 🔥 Big Billion Day Text */}
      <div className="text-center my-6">
        <h2 className="text-xl font-bold text-red-600">
          ⚡ Big Billion Day Sale – Hurry! Limited Stock ⏳
        </h2>
        <p className="text-gray-600">Up to <span className="font-bold text-red-500">50% OFF</span> on selected products!</p>
      </div>


      {/* Products */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow hover:shadow-2xl transition">
            <div className="relative flex items-center justify-center h-56">
              {/* Added relative positioning to the container */}
              <img src={p.image} alt={p.name} className="max-h-48 object-contain" />
            </div>
            {/* Added relative positioning to the content container */}
            <div className="p-4 text-center relative">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-500 line-through">₹{p.mrp}</p>
              <p className="text-green-600 font-bold text-xl">₹{p.price}</p>
              <button
                onClick={() => addToCart(p)}
                // ✅ Add z-10 class to ensure the button is on top
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg relative z-10"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

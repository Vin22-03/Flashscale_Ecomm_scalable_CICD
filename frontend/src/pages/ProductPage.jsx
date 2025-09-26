import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();

  // Sample product (later can come from API/backend)
  const product = {
    id,
    name: "Laptop (Dell Inspiron 15)",
    mrp: 65000,
    price: 55000,
    desc: "Powerful laptop with Intel i7, 16GB RAM, 512GB SSD.",
    image: "/assets/laptop.jpg",
  };

  return (
    <div className="p-8 flex flex-col md:flex-row items-center gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="h-72 object-contain"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500 line-through">₹{product.mrp}</p>
        <p className="text-green-600 font-bold text-xl">₹{product.price}</p>
        <p className="mt-4 text-gray-700">{product.desc}</p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">
          Add to Cart
        </button>
        <Link
          to="/cart"
          className="ml-4 bg-yellow-500 px-6 py-2 rounded-lg text-black"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    clearCart();
    navigate("/order-status/12345"); // Simulated order ID
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span className="text-green-600 font-bold">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <h2 className="mt-4 text-xl font-bold">Total: ₹{total}</h2>
          <button
            className="mt-4 bg-yellow-500 px-4 py-2 rounded"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

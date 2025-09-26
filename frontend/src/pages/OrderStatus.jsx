import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o) => String(o.id) === id);
    if (foundOrder) setOrder(foundOrder);
  }, [id]);

  useEffect(() => {
    if (statusIndex < statuses.length - 1) {
      const timer = setTimeout(() => setStatusIndex(statusIndex + 1), 5000); // 5s per step
      return () => clearTimeout(timer);
    }
  }, [statusIndex]);

  if (!order) return <p className="p-6">Order not found.</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🚚 Order Tracking</h1>
      <p>Order ID: <span className="font-mono">{id}</span></p>
      <p className="mt-2">Customer: {order.customer.name}</p>
      <div className="mt-6">
        {statuses.map((s, i) => (
          <div
            key={i}
            className={`p-2 my-2 rounded ${
              i <= statusIndex ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

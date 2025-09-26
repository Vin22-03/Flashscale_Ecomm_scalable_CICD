import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-4 rounded shadow flex justify-between"
            >
              <div>
                <p className="font-bold">Order ID: {order.id}</p>
                <p>{order.customer.name}</p>
                <p className="text-gray-600">Items: {order.items.length}</p>
              </div>
              <Link
                to={`/order-status/${order.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Track Order
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import time
from fastapi.middleware.cors import CORSMiddleware
import os
from app.routes import version, products, cart, orders, status  # ✅ import routes



# ✅ Create FastAPI app first
app = FastAPI()

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # for dev, later restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register routers
app.include_router(version.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(cart.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(status.router, prefix="/api")

# Mock DB
products = [
    {
        "id": 1,
        "name": "Laptop (Dell Inspiron 15)",
        "mrp": 65000,
        "price": 55000,
        "image": "/assets/laptop.jpg",
        "desc": "Powerful laptop with Intel i7, 16GB RAM, 512GB SSD."
    },
    {
        "id": 2,
        "name": "LED TV (Samsung 43-inch 4K)",
        "mrp": 48000,
        "price": 38000,
        "image": "/assets/tv.jpg",
        "desc": "Smart 4K UHD TV with HDR."
    }
]

orders: List[Dict] = []


# Models
class Customer(BaseModel):
    name: str
    address: str
    phone: str
    email: str


class CartItem(BaseModel):
    id: int
    name: str
    price: int
    quantity: int


class Order(BaseModel):
    id: int
    customer: Customer
    items: List[CartItem]
    status: str = "Processing"


# 🔹 Root endpoint
@app.get("/")
def root():
    return {"message": "FlashScale Backend is running 🚀"}


# 🔹 Health check (for monitoring & probes)
@app.get("/health")
def health_check():
    return {"status": "ok", "timestamp": time.time()}


# Products API
@app.get("/products")
def get_products():
    return products


# Checkout (place order)
@app.post("/checkout")
def checkout(order: Order):
    orders.append(order.dict())
    return {"message": "Order placed", "orderId": order.id}


# Orders
@app.get("/orders")
def get_orders():
    return orders



@app.get("/build-info")
def build_info():
    return {
        "version": os.getenv("APP_VERSION", "unknown"),
        "color": os.getenv("DEPLOY_COLOR", "unknown"),
        "build_time": os.getenv("BUILD_TIME", "unknown")
    }


# Order status
@app.get("/order-status/{order_id}")
def get_order_status(order_id: int):
    for o in orders:
        if o["id"] == order_id:
            return o
    return {"error": "Order not found"}

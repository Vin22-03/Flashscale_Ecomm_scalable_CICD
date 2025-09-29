from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import time
from fastapi.middleware.cors import CORSMiddleware
import os

# Prometheus
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST, Counter
from starlette.responses import Response

# Import routes (if you still use them)
from app.routes import version, products as products_router, cart, orders as orders_router, status

# ✅ Create FastAPI app
app = FastAPI()

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # For dev, later restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register routers
app.include_router(version.router, prefix="/api")
app.include_router(products_router.router, prefix="/api")
app.include_router(cart.router, prefix="/api")
app.include_router(orders_router.router, prefix="/api")
app.include_router(status.router, prefix="/api")

# ---------------- Mock DB ----------------
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

# ---------------- Models ----------------
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

# ---------------- Prometheus Counters ----------------
ORDER_COUNTER = Counter("flashscale_orders_total", "Total number of orders placed")
PRODUCTS_COUNTER = Counter("flashscale_products_total", "Total number of products viewed")

# ---------------- Endpoints ----------------

# 🔹 Root endpoint
@app.get("/")
def root():
    return {"message": "FlashScale Backend is running 🚀"}

# 🔹 Health check
@app.get("/health")
def health_check():
    return {"status": "ok", "timestamp": time.time()}

# 🔹 Products API
@app.get("/products")
def get_products():
    PRODUCTS_COUNTER.inc()   # increment each time products are viewed
    return products

# 🔹 Checkout (place order)
@app.post("/checkout")
def checkout(order: Order):
    orders.append(order.dict())
    ORDER_COUNTER.inc()      # increment order counter
    return {"message": "Order placed", "orderId": order.id}

# 🔹 Orders
@app.get("/orders")
def get_orders():
    return orders

# 🔹 Build info (for Blue/Green deploys)
@app.get("/build-info")
def build_info():
    return {
        "version": os.getenv("APP_VERSION", "unknown"),
        "color": os.getenv("DEPLOY_COLOR", "unknown"),
        "build_time": os.getenv("BUILD_TIME", "unknown")
    }

# 🔹 Order status
@app.get("/order-status/{order_id}")
def get_order_status(order_id: int):
    for o in orders:
        if o["id"] == order_id:
            return o
    return {"error": "Order not found"}

# 🔹 Prometheus metrics endpoint
@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

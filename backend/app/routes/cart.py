from fastapi import APIRouter
from typing import Dict

router = APIRouter()
cart = {}

@router.post("/cart")
def add_to_cart(item: Dict):
    product_id = item.get("product_id")
    qty = item.get("qty", 1)
    if product_id in cart:
        cart[product_id] += qty
    else:
        cart[product_id] = qty
    return {"message": "Item added", "cart": cart}

@router.get("/cart")
def get_cart():
    return {"cart": cart}

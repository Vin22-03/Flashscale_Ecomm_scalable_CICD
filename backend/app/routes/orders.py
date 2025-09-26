from fastapi import APIRouter
from typing import Dict

router = APIRouter()
orders = []

@router.post("/orders")
def place_order(order: Dict):
    order_id = len(orders) + 1
    orders.append({"id": order_id, "details": order})
    return {"message": "Order placed", "order_id": order_id}

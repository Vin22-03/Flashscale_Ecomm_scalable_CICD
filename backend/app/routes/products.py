from fastapi import APIRouter

router = APIRouter()

@router.get("/products")
def get_products():
    return [
        {"id": 1, "name": "Laptop (Dell Inspiron 15)", "price": 55000},       # ₹55,000
        {"id": 2, "name": "LED TV (Samsung 43-inch 4K)", "price": 38000},     # ₹38,000
        {"id": 3, "name": "Washing Machine (LG Front Load)", "price": 32000}, # ₹32,000
        {"id": 4, "name": "Refrigerator (Whirlpool Double Door)", "price": 45000} # ₹45,000
    ]

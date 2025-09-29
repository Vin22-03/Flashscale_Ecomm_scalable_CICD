from locust import HttpUser, task, between
import random

class FlashScaleUser(HttpUser):
    # 🔥 Add your ALB DNS here
    host = "http://acb7714b73b0e4e7d91e093b82c88a13-1776779104.us-east-1.elb.amazonaws.com:8000"
    wait_time = between(1, 3)  # user waits 1–3s between actions

    @task(2)
    def browse_products(self):
        self.client.get("/products")

    @task(1)
    def add_to_cart_and_checkout(self):
        # Simulate adding a random product
        product_id = random.choice([1, 2])
        cart_item = {
            "id": product_id,
            "name": "Test Item",
            "price": 1000,
            "quantity": 1
        }
        order = {
            "id": random.randint(1000, 9999),
            "customer": {
                "name": "User",
                "address": "123 Street",
                "phone": "9999999999",
                "email": "user@test.com"
            },
            "items": [cart_item],
            "status": "Processing"
        }
        self.client.post("/checkout", json=order)

    @task(1)
    def check_order_status(self):
        self.client.get("/orders")

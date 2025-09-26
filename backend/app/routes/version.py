from fastapi import APIRouter
import os

router = APIRouter()

@router.get("/version")
def get_version():
    return {
        "app": os.getenv("APP_NAME", "FlashScale"),
        "version": os.getenv("VERSION", "unknown"),
        "env": os.getenv("ENV", "dev")
    }

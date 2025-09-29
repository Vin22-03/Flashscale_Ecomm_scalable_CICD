# app/routes/version.py
from fastapi import APIRouter
import os

router = APIRouter()

@router.get("/build-info")
def build_info():
    return {
        "version": os.getenv("APP_VERSION", "unknown"),
        "color": os.getenv("DEPLOY_COLOR", "unknown"),
        "build_time": os.getenv("BUILD_TIME", "unknown"),
    }

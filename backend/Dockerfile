FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 🔹 Inject build metadata
ARG APP_VERSION="dev"
ARG DEPLOY_COLOR="none"
ARG BUILD_TIME="unknown"

ENV APP_VERSION=$APP_VERSION
ENV DEPLOY_COLOR=$DEPLOY_COLOR
ENV BUILD_TIME=$BUILD_TIME

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

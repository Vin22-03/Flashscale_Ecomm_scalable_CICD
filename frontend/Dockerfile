# Stage 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

# 🔹 Accept build arguments (passed from Jenkins)
ARG VITE_APP_VERSION="dev"
ARG VITE_APP_COLOR="none"
ARG VITE_APP_BUILD_TIME="unknown"

# 🔹 Expose them so Vite can inject into build
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_APP_COLOR=$VITE_APP_COLOR
ENV VITE_APP_BUILD_TIME=$VITE_APP_BUILD_TIME

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

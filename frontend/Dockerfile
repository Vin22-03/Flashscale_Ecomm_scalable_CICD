# Stage 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

# 🔹 Accept build arguments from Jenkins
ARG APP_VERSION="dev"
ARG DEPLOY_COLOR="none"
ARG BUILD_TIME="unknown"

# 🔹 Set them as React env variables (must start with REACT_APP_)
ENV REACT_APP_VERSION=$APP_VERSION
ENV REACT_APP_COLOR=$DEPLOY_COLOR
ENV REACT_APP_BUILD_TIME=$BUILD_TIME

# 🔹 Copy package files and install dependencies with retries
COPY package*.json ./

# Configure npm registry + retries to avoid ETIMEDOUT
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm install --legacy-peer-deps

# 🔹 Copy source code and build (REACT_APP_* baked in here)
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

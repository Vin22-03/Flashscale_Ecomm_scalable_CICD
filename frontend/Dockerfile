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

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build (now REACT_APP_* vars are baked into bundle)
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

# Stage 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

# 🔹 Accept build arguments (will be passed from Jenkins)
ARG REACT_APP_VERSION="dev"
ARG REACT_APP_COLOR="none"
ARG REACT_APP_BUILD_TIME="unknown"

# 🔹 Expose them as ENV so React build can access them
ENV REACT_APP_VERSION=$REACT_APP_VERSION
ENV REACT_APP_COLOR=$REACT_APP_COLOR
ENV REACT_APP_BUILD_TIME=$REACT_APP_BUILD_TIME

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

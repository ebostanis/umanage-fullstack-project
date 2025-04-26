# Build React App
FROM node:23-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Serve app using NGINX
FROM nginx:alpine

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React file to NGINX
COPY --from=builder /app/build /usr/share/nginx/html

#Expose the port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
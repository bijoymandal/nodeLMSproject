# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# copy source code
COPY . .

# build React (includes Tailwind)
RUN npm run build

# Stage 2: Nginx server
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# expose nginx port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

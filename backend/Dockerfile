# ------------------------
# Base image
# ------------------------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# ------------------------
# Development image
# ------------------------
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# ------------------------
# Production image
# ------------------------
FROM base AS prod
RUN npm ci --omit=dev   # ✅ omit devDependencies (no nodemon in prod)
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "start"]    # ✅ run with node, not nodemon

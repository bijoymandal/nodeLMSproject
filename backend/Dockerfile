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
EXPOSE 3400
CMD ["npm", "run", "dev"]

# ------------------------
# Production image
# ------------------------
FROM base AS prod
# Install only production dependencies
RUN npm ci --omit=dev
# RUN npm install --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 3400
CMD ["npm", "start"]

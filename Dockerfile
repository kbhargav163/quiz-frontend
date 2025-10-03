# quiz-frontend/Dockerfile
# Builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Accept backend URL at build-time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Install deps
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy build output
COPY --from=builder /app ./

# Expose port used by Next.js
EXPOSE 3000

# Ensure runtime knows port (optional)
ENV PORT=3000

# Start in production
CMD ["npm", "run", "start"]



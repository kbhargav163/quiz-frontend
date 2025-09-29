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















# docker-compose.yml file

# version: "3.8"

# services:
#   backend:
#     build:
#       context: ./quiz-backend
#       dockerfile: Dockerfile
#     image: quiz-backend:latest
#     container_name: quiz-backend
#     ports:
#       - "8080:8080"
#     restart: unless-stopped
#     networks:
#       - quiz-net

#   frontend:
#     build:
#       context: ./quiz-frontend
#       dockerfile: Dockerfile
#       args:
#         NEXT_PUBLIC_API_URL: "http://backend:8080/api/quiz"
#     image: quiz-frontend:latest
#     container_name: quiz-frontend
#     ports:
#       - "3000:3000"
#     restart: unless-stopped
#     depends_on:
#       - backend
#     networks:
#       - quiz-net

# networks:
#   quiz-net:
#     driver: bridge

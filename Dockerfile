# Stage 1: сборка NestJS
FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: запуск с production-зависимостями
FROM node:24-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install  --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]

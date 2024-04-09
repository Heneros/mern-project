
FROM node:latest AS builder
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend ./
FROM nginx:1.25.2-alpine-slim
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
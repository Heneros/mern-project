# Use the latest Node.js image as the base
FROM node:latest AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use the Nginx image as the production environment
FROM nginx:1.25.2-alpine-slim

# Copy the built assets from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
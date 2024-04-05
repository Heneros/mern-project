FROM  node:latest AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm","start"]


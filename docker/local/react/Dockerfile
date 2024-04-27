FROM node:16-alpine3.12
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend ./

EXPOSE 7200

CMD ["npm","start"]




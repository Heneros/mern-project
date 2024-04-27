
FROM node:16-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 7200

CMD ["npm","start"]

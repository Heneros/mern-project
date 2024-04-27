FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY ./backend/package*.json ./  

RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]
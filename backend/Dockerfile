FROM node:16.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3001

ENTRYPOINT ["node", "/app/app.js"]
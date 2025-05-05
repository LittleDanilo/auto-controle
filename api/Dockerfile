FROM node:slim

WORKDIR /usr/auto-controle/api
COPY ./package*.json ./

RUN npm install
COPY . .

EXPOSE 5000
CMD [ "npm", "start"]
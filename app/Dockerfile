FROM node:slim

WORKDIR /usr/auto-controle/app
COPY ./package*.json ./

RUN npm install
COPY . .

EXPOSE 5173
CMD [ "npm", "run", "dev", "--","--host" ]
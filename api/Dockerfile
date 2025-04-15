FROM node:lts-bullseye

WORKDIR /usr/auto-controle/api
COPY ./package*.json ./

RUN npm install
COPY . .

EXPOSE 5000
CMD [ "npm", "run", "dev"]
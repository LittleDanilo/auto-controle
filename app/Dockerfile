FROM node:lts-bullseye

WORKDIR /usr/auto-controle/app
COPY ./package*.json ./

RUN npm install
COPY . .

EXPOSE 5173
CMD [ "npm", "run", "dev", "--","--host" ]
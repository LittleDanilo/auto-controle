FROM node:22.14

WORKDIR /usr/auto-controle/api
COPY ./package*.json ./

RUN npm install
COPY . .

EXPOSE 5000
CMD [ "npm", "run", "dev" ]
FROM node:20-alpine

WORKDIR /session_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]
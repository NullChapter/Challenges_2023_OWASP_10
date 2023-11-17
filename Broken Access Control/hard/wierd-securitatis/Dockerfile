FROM node:slim
WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .
RUN node initDB.js
CMD [ "node", "index.js" ]

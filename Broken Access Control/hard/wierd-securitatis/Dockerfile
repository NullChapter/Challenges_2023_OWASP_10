FROM node:slim
WORKDIR /wierd-securitatis

COPY package*.json ./
RUN npm install 

COPY . .
RUN node initDB.js
CMD [ "node", "index.js" ]

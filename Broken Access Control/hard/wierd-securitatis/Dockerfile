FROM node:slim
WORKDIR /wierd-securitatis

COPY package*.json ./
RUN npm install 

COPY . .
EXPOSE 3555
RUN node initDB.js
CMD [ "node", "index.js" ]



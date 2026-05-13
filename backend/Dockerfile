FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY scripts ./scripts

EXPOSE 8800

CMD ["node", "src/index.js"]


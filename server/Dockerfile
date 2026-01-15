FROM node:22.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY src ./dist

CMD ["npm", "start"]

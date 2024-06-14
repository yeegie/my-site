FROM node:alpine AS build

WORKDIR /app

COPY /frontend/package*.json ./
COPY /frontend/ ./

RUN npm install -g npm@latest && \
    npm i

CMD ["npm", "run", "start"]
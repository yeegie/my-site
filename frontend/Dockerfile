FROM node:alpine AS build

WORKDIR /app

COPY /frontend/package*.json ./
COPY /frontend/ ./

RUN npm install -g npm@latest && npm i
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /usr/local/bin

COPY --from=build /app/dist /usr/share/nginx/html

COPY /frontend/generate-config.sh ./

COPY /frontend/custom-nginx.template /etc/nginx/conf.d/

RUN chmod +x generate-config.sh

ENTRYPOINT [ "/bin/sh", "generate-config.sh"]

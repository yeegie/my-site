FROM node:22-alpine AS prod

WORKDIR /app

COPY /frontend/package*.json .
RUN npm i

COPY /frontend/ .

RUN npm run build


FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=prod /app/dist /usr/share/nginx/html

COPY /frontend/generate-config.sh .

COPY /frontend/custom-nginx.template /etc/nginx/conf.d/

RUN chmod +x generate-config.sh

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "generate-config.sh"]
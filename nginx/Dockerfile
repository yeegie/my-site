FROM nginx:stable-alpine

WORKDIR /usr/local/bin

COPY /nginx/generate-config.sh ./
COPY /nginx/custom-nginx.template /etc/nginx/conf.d/

RUN chmod +x generate-config.sh

ENTRYPOINT ["/bin/sh", "generate-config.sh"]

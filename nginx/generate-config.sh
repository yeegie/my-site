#!/bin/sh
envsubst '$VITE_API_URL' &lt; /etc/nginx/conf.d/nginx.conf &gt; /etc/nginx/conf.d/default.conf;
exec nginx -g "daemon off;";
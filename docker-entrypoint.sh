#!/bin/sh
set -e

# Gera env.js a partir do template, substituindo pelas variáveis de ambiente reais do container
envsubst '$API_URL' < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

exec nginx -g 'daemon off;'

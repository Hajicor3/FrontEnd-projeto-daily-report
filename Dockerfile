# ETAPA 1: Build (Node + npm)
FROM node:22-alpine AS builder

WORKDIR /build

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# Copia código e compila
COPY . .
RUN npm run build

# ETAPA 2: Serve (Nginx - muito mais leve!)
FROM nginx:alpine

# envsubst (pacote gettext) é usado pelo entrypoint para gerar env.js em tempo de execução
RUN apk add --no-cache gettext

# Copia arquivos compilados do stage anterior
COPY --from=builder /build/dist/daily-report/browser /usr/share/nginx/html

# Copia config do nginx (importante!)
COPY nginx.conf /etc/nginx/nginx.conf

# Script que gera env.js a partir das variáveis de ambiente do container, na inicialização
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]

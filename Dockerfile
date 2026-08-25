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

# Copia arquivos compilados do stage anterior
COPY --from=builder /build/dist/daily-report/browser ./usr/share/nginx/html

# Copia config do nginx (importante!)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

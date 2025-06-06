FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir la app con serve
FROM node:18-alpine

WORKDIR /app

# Instalar serve globalmente
RUN npm install -g serve

# Copiar los archivos build desde la etapa de build
COPY --from=build /app/dist ./dist

# Exponer puerto 3000 (o el que prefieras)
EXPOSE 3000

# Comando para servir la app
CMD ["serve", "-s", "dist", "-l", "300"]
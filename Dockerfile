
FROM node:18

WORKDIR /app


COPY package.json ./


# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Exponer el puerto 5173
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
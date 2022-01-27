FROM node:16

WORKDIR /app

# Añade PATH para el uso de nodemon
ENV PATH /app/node_modules/.bin:$PATH

# Copia proyecto e instala dependencias
COPY . ./
RUN yarn install

# Inicia servicio
CMD ["sh", "run.sh"]
FROM node:16

WORKDIR /app

# Añade PATH para el uso de nodemon
ENV PATH /app/node_modules/.bin:$PATH

COPY . ./
RUN yarn install

CMD ["sh", "run.sh"]
# Sobre el proyecto

**Este proyecto forma parte del desafió técnico de [RECYLINK](https://recylink.com/)**

El proyecto consiste en una API RESTful llamada "Parques🌲 y sus Aves🐦". El servicio propone, a modo de prototipo, un sistema para que los amantes de la naturaleza averigüen en que Parque Nacional pueden observar diversas especies Aves. Mediante sus diversos _endpoint_ podemos interactuar con dos modelos distintos. El modelo Park, el cual representa Parques Nacionales de Chile. Y el modelo Bird, el cual representa Aves que pueden ser encontradas a lo largo del país. Estos dos modelos se relacionan de manera "muchos a muchos". De esta manera es posible encontrar, en un Parque, diversas Aves; y una determinada Ave puede estar en diversos Parques.

## Instalación

Es necesario tener [Docker](https://www.docker.com/) en el ambiente de desarrollo.

1. `docker-compose build` para construir las imágenes.
2. `docker-compose up -d` para levantar los contenedores.

**En el primer inicio es necesario esperar unos 15 segundos adicionales al levantamiento de los contenedores para que se complete el proceso de generar las credenciales y poblar la base de datos.** Inicios posteriores son mas expeditos.

3. La API queda expuesta en `localhost:5000`. Ejemplo de endpoint GET: `localhost:5000/v1/park/list` para listar todos los Parques.

Si la variable de entorno `DOCKER_MODE` localizada en `./docker-compose.yml` esta en `development`, queda expuesta la GUI de [Swagger](https://swagger.io/) en `http://localhost:5000/v1/docs/` para interactuar con la API.

## Uso

Se recomienda ejecutar en modo `development` (por defecto) para tener acceso a la GUI de Swagger y la documentación de cada endpoint. Existen endpoints para realizar CURD sobre el modelo de Park y Bird. Adicionalmente existen 4 endpoints mas para poder crear y destruir las relaciones entre Parques y Aves.

## Detalles técnicos

El proyecto esta compuesto por dos contenedores. El contenedor "backend", el cual contiene el servicio de la API basado en el framework [ExpressJs](https://expressjs.com/). Y el contenedor "mongodb" el cual suministra la base de datos [MongoDb v5](https://www.mongodb.com/).

La API esta basada en el framework [ExpressJs](https://expressjs.com/) y la base de datos en [MongoDb v5](https://www.mongodb.com/).

### Detalles del contenedor "backend"

Este contenedor ejecuta [NodeJs](https://nodejs.org/) con ExpressJs. Se usa [mongoose](https://mongoosejs.com/) para interactuar con la base de datos, [joi](https://joi.dev/) para realizar validaciones de datos, Swagger para documentar la API y [jest](https://jestjs.io/) para realizar los test correspondientes. Adicionalmente, en modo _development_, se implementa el demonio [nodemon](https://www.npmjs.com/package/nodemon) para agilizar el desarrollo mediante _hot-reload_.

La estructura de la aplicación se divide en:

- /src (código fuente de la aplicación)

  - /api (endpoints)
  - /controllers (controladores de los modelos)
  - /docs (para el manejo de Swagger)
  - /models (modelos)
  - /utils (otras utilidades)
  - /validations (validadores)

- /test (para el test de la aplicación)
  - /fixture (entidades pre-definidas)
  - /integration (test de integración para los endpoint)
  - /unit (test unitarios para los modelos)

Se han implementado las [transactions](https://docs.mongodb.com/upcoming/core/transactions/) de MongoDb en las operaciones que interactúen con mas de una colección a la vez, para asegurar la atomicidad de la transacción. Eso solo en operaciones que ejecuten alguna creación, edición o destrucción de datos.

Los dos modelos incluidos en el proyecto se relacionan de muchos a muchos mediante referencias (no embebidos). La mayoría de los endpoins solo retornan el modelo correspondiente; pero algunos endpoint de tipo GET poseen una opción adicional para retornar la información en formato embebido.

Es posible ejecutar los test, usando jest, localizándose en **la shell del contenedor "backend"** y ejecutando: `npm run test`. El test se ejecuta de forma secuencial y no paralela ya que algunos test de integración comparten recursos. Los test contemplan pruebas unitarias y de integración; durante el proceso se usa una base de datos exclusiva para test.

### Detalles del contenedor "mongodb"

Este contenedor monta una instancia de MongoDb v5. En la primera ejecución, el contenedor crea automáticamente diversos usuarios, con sus respectivos roles de acceso, para ser usados por el backend. Posteriormente se crea y puebla la base de datos con algunas entidades iniciales a modo de ejemplo. La base de datos principal recibe el nombre de "maindb".

La instancia de MongoDb se inicia con la configuración de [replica-set](https://docs.mongodb.com/manual/replication/) activa (solo 1 nodo), esto para poder tener acceso a las operaciones de tipo [transactions](https://docs.mongodb.com/upcoming/core/transactions/), necesarias para asegurar acciones atómicas en multiples colecciones.

Adicionalmente se genera una base de datos exclusiva para los test denominada "test".

### Estructura de los modelos:

El modelo Park tiene los atributos:

- name: Nombre del Parque
- region: Region de Chile donde se localiza el Parque
- park_type: Tipo de Parque según [CONAF](https://www.conaf.cl/) (Parque, Reserva o Monumento)
- hectares: Hectáreas de extension del Parque
- link: Link a la web oficial del Parque
- birds: Lista de Ids de las Aves que pueden ser vistas en el Parque

El modelo Bird tiene los atributos:

- name: Nombre común del Ave
- description: Descripción general del Ave
- habitat: Habitat del Ave
- length_cm: Extension de las alas en centímetros del Ave
- risk: Nivel de riesgo de extinción según la escala de [iucnredlist](https://www.iucnredlist.org/), los cuales son: [ No evaluado, Datos insuficientes, Menor riesgo, Casi amenazado, Vulnerable, Peligro de extinción, Peligro de extinción critico, Extinto en la naturaleza, Extinto ]
- link: Link a [avesdechile](https://www.avesdechile.cl/)
- parks: Lista de Ids de los Parques donde esta el Ave

Detalles sobre los atributos y validadores de cada campo pueden ser encontrados en en directorio `./sec/models` del backend.

## Herramientas adicionales y referencias

Algunas herramientas adicionales para el estándar del código:

- Eslint
- Prettier

**Parte de la estructura de la aplicación y las herramientas auxiliares localizadas en `./utils` como `./test` están inspiradas en el trabajo de [hagopj13](https://github.com/hagopj13/node-express-boilerplate)**

## Nota extra

La complejidad de los modelos, relaciones y endpoins son básicos y solo pretenden ser un ejemplo de API RESTful. De la misma manera, las entidades iniciales cargadas en la base de datos son mínimas, solo para facilitar la prueba del sistema.

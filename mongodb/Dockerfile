FROM mongo:5.0.5

# Copia archivos de configuración y de inicio
COPY mongod.conf /etc/mongo/
COPY entrypoint_script.sh /docker-entrypoint-initdb.d/
COPY init.sh /

# Copia un dump de la base de datos para realizar la población inicial del la misma
ADD saveDb /saveDb

# Asigna permisos al fichero mongod.conf
RUN chmod 400 /etc/mongo/mongod.conf
RUN chown 999:999 /etc/mongo/mongod.conf

# Instala Open SSL, genera una key y asigna permisos (Para uso de MongoDb ReplicaSet)
RUN apt-get update
RUN apt-get install libssl-dev -y
RUN openssl rand -base64 741 > /etc/mongo/mongodb.key
RUN chmod 400 /etc/mongo/mongodb.key
RUN chown 999:999 /etc/mongo/mongodb.key
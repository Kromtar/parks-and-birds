# Inicia el servidor como demonio si estamos en development
if [ $DOCKER_MODE = "development" ]
then
    nodemon -x 'node server.js || touch server.js'
else
    node server.js
fi
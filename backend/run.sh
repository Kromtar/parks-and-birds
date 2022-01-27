if [ $DOCKER_MODE = "development" ]
then
    echo "Container in Development Mode"
    nodemon -x 'node server.js || touch server.js'
else
    echo "Container in Production Mode"
    node server.js
fi
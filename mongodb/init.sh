# Inicia la base de datos con la replica set y con los principales usuarios
# Se espera 10 segundos para asegurar que el proceso de MongoDb ya este ejecutándose completamente
sleep 10

echo "Init Replica Set"
mongo --eval 'rs.initiate({"_id":"'${REPLICA_SET_NAME}'","members":[{"_id":0,"host":"'${REPLICA_SET_HOST}'"}]}); quit();'

echo "Create Superuser"
mongo --eval 'db.createUser({user:"'${SUPERUSER_USERNAME}'", pwd:"'${SUPERUSER_PASSWORD}'", roles:[{role:"userAdminAnyDatabase", db:"admin"}, {role:"readWriteAnyDatabase", db:"admin"}]}); quit();' admin

echo "Create main database"
mongo -u $SUPERUSER_USERNAME -p $SUPERUSER_PASSWORD --eval 'db = db.getSiblingDB("'${DATABASE_NAME}'"); db.dummy.insert({"dummy":"dummy"}); db = db.getSiblingDB("test"); db.dummy.insert({"dummy":"dummy"}); quit();'

echo "Create main database normal user"
mongo -u $SUPERUSER_USERNAME -p $SUPERUSER_PASSWORD --eval 'db.createUser({user:"'${DATABASE_USERNAME}'", pwd:"'${DATABASE_PASSWORD}'", roles:[{role:"readWrite", db:"'${DATABASE_NAME}'"}, {role:"readWrite", db:"test"}]}); quit()' admin

echo "Populate DB with initial data"
mongorestore --verbose ./saveDb -u=$DATABASE_USERNAME -p=$DATABASE_PASSWORD
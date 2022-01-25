# Inicia la base de datos con la replica set y con los principales usuarios

sleep 10

echo "Init Replica Set"
mongo --eval 'rs.initiate({"_id":"'${REPLICA_SET_NAME}'","members":[{"_id":0,"host":"'${REPLICA_SET_HOST}'"}]}); quit();'

echo "Create Superuser"
mongo --eval 'db.createUser({user:"'${SUPERUSER_USERNAME}'", pwd:"'${SUPERUSER_PASSWORD}'", roles:[{role:"userAdminAnyDatabase", db:"admin"}, {role:"readWriteAnyDatabase", db:"admin"}]}); quit();' admin

echo "Create main database"
mongo -u $SUPERUSER_USERNAME -p $SUPERUSER_PASSWORD --eval 'db = db.getSiblingDB("'${DATABASE_NAME}'"); db.dummy.insert({"dummy":"dummy"}); quit();'

echo "Create mongo-express user"
mongo -u $SUPERUSER_USERNAME -p $SUPERUSER_PASSWORD --eval 'db.createUser({user:"'${EXPRESS_USERNAME}'", pwd:"'${EXPRESS_PASSWORD}'", roles:[{role:"clusterMonitor", db:"admin"}, {role: "readWrite", db: "'${DATABASE_NAME}'"}]}); quit()' admin

echo "Create main database normal user"
mongo -u $SUPERUSER_USERNAME -p $SUPERUSER_PASSWORD --eval 'db.createUser({user:"'${DATABASE_USERNAME}'", pwd:"'${DATABASE_PASSWORD}'", roles:[{role:"readWrite", db:"'${DATABASE_NAME}'"}]}); quit()' admin

sh populate.sh
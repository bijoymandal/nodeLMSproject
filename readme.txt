#setup node js project for backend
npm init 
#install all node project depdency 
npm insall express express cors nodemon dotenv morgan
#set up environment file 
cat .env
#setup dockerimage file 
cat docke-composer.yml
#setup docker file 
cat Dckerfile
#set up docker image file create container
inside backend
docker build -t backend .
#docker image have error cache clear 
docker compose build --no-cache backend
docker compose up -d
#docker have any error issue any one image/container to stop
docker compose down -v
#mongo db collection show in terminal
docker ps
docker exec -it mongo_container mongosh -u root -p example --authenticationDatabase admin
#switch to your database
show dbs
use lmsproject
#list All collection
show collection 
#Run development with hot reload
docker-compose up --build backend-dev
#Run production optimized:
docker-compose up --build -d backend-prod
#Run seeder file withdocker environment 
docker compose run backend npm run seed





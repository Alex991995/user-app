### To run a docker container

docker compose -f docker-compose.yml up --build

docker compose exec app npx prisma migrate dev --name init

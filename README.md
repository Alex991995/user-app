### run command

git clone git@github.com:Alex991995/user-app.git

#### swith on dev branch

### create .env with

DATABASE_URL="postgresql://postgres:prisma@postgres:5432/postgres?schema=public"
PORT=3000
SECRET=frefgrefv
SALT=10

or set up your local enviroment

## To run a docker container

docker compose -f docker-compose.yml up --build

docker compose exec app npx prisma migrate dev --name init

### Routes

- create user

http://localhost:3000/user/create

- login user

http://localhost:3000/auth/login

requere email and password

## Next goes protected routers

#### Please attache access token into Authorization Bearer

- get the list of users

http://localhost:3000/user
please attache acces token into Authorization Bearer

- block user's status

PUT

http://localhost:3000/user/:id

- get a user by id

http://localhost:3000/user/

# Nexma - Next.js with Apollo and Prisma

## Prerequisites
  - Install Node & npx

    ❯ npm i -g npx

  - Install dotenv

    ❯ npm i -g dotenv

  - Install Now

    ❯ npm i -g now

  - Create your `.env` files and set your env

    ❯ cp .env.example .env
    ❯ cp server/.env.example server/.env
    ❯ cp server/prisma/.env.example server/prisma/.env

## Dev
This project is using `MySQL`. You're database must be running.

Run the client `cd client && npm run dev` and run the server `cd server && npm start`

## Client
Code is in the `client` directory.

It's a Next.js app with Apollo and [next-translate](https://github.com/vinissimus/next-translate).

You can access it via http://localhost:3000

`client/pages` directory from Next is generated thanks to `next-translate`.
There is a sub directory for each lang.

You have to code your pages in `client/pages_`

## Server
Code is in the `server` directory.

You can access your server GraphQL playground via http://localhost:4000/graphql

## Prisma
Code is in the `server/prisma` directory.

Update your local database depending of your shema file

    ❯ npm run deploy-prisma

## Release
You will need a working MySQL database running somewhere (AWS, Heroku, etc)

Do these 4 steps only once:
  - in console, type `now secret add app_secret <APP_SECRET>`
  - in console, type `now secret add database_url <DATABASE_URL>`
  - set `SERVER_URL` in `client/next.config.js`
  - set `SERVER_URL`and `CLIENT_URL` in `now.json`

Then, each time you want to release in prod: `npm run release`

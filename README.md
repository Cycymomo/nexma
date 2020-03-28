# Nexma - Next.js with Apollo and Prisma

## Prerequisites
  - Install Docker for your OS
  - Install Prisma

    ❯ npm i -g prisma

  - Install Now

    ❯ npm i -g now

  - Create your `.env` files and set your env

    ❯ cp .env.example .env && cp server/.env.example server/.env
    ❯ cp server/prisma/.env.example server/prisma/.env

## Dev
You just have to type `npm start` and it will run: mysql, prisma, server and client inside Docker.

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

You can access your admin GraphQL playground via http://localhost:PRISMA_PORT

You can manage your data via http://localhost:PRISMA_PORT/_admin

Generate token (you need to add it in HTTP HEADERS of the admin GraphQL playground + `_admin`)

    ❯ cd server/prisma && prisma token

Deploy `prisma` (when you make change to your data structure, to update database. Prisma server must be running)

    ❯ npm run deploy-prisma:dev

## Release
Go to https://app.prisma.io/ and create an account. You will have an endpoint, for example: https://eu1.prisma.sh/YOUR-NAMESPACE
From this enpoint, you can create your Prisma Prod service (`PRISMA_URL`): https://eu1.prisma.sh/YOUR-NAMESPACE/nexma/prod

Make sure you have a `.env.prod` file for prisma and env variables set

    ❯ cp server/prisma/.env.example server/prisma/.env.prod

Also set these same variables in Now:
  - in console, type `now secret add prisma_url PRISMA_URL`
  - in console, type `now secret add prisma_management_api_secret PRISMA_MANAGEMENT_API_SECRET`
  - set `SERVER_URL` in `client/next.config.js`
  - set `SERVER_URL`and `CLIENT_URL` in `now.json`

Then, release `prisma`, `client` and `server` in prod

    ❯ npm run release

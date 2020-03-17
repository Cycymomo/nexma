# Nexma - Next.js with Apollo and Prisma

## Prerequisites
  - Install Docker for your OS
  - Install Prisma

    ❯ npm i -g prisma

  - Create your `.env` files and set your env

    ❯ cp .env.example .env && cp server/.env.example server/.env
    ❯ cp server/prisma/.env.example server/prisma/.env

## Dev
You just have to type `npm start` and it will run: mysql, prisma, server and client inside Docker.

## Client
Code is in the `client` directory.
It's a Next.js app with Apollo.

You can access it via http://localhost:3000

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
Make sure you have a `.env.prod` file for prisma and env variables set

    ❯ cp server/prisma/.env.example server/prisma/.env.prod

Then, release `prisma` / `client` and `server` in prod

    ❯ npm run release

# CRAPrisma - Create React App with Prisma

## Prerequisites
  - Install Docker for your OS
  - Install Prisma

    ❯ npm i -g prisma

  - Create your `.env` files and set your env

    ❯ cp .env.example .env && cp server/.env.example server/.env && cp server/.env.example server/prisma/.env

## Run
You just have to type `npm start` and it will run: mysql, prisma, server and client inside Docker.

## Client
Code is in the `client` directory.
It's a create-react-app with Apollo.

You can access it via http://localhost:3000

## Server
Code is in the `server` directory.

You can access your server GraphQL playground via http://localhost:4000

## Prisma
Code is in the `server/prisma` directory.

You can access your admin GraphQL playground via http://localhost:PRISMA_PORT

You can manage your data via http://localhost:PRISMA_PORT/_admin

Generate token (you need to add it in HTTP HEADERS of the admin GraphQL playground + `_admin`)

    ❯ cd server/prisma && prisma token

Deploy `prisma` (when you make change to your data structure. Prisma server must running)

    ❯ cd server/prisma && prisma deploy

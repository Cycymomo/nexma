# CRAPrisma - Create React App with Prisma 2

## Prerequisites
  - Install Docker for your OS
  - Install Prisma 2

    ❯ npm i -g prisma2

  - Create your `.env` files and set your env

    ❯ cp .env.example .env && cp server/.env.example server/.env

## Run
You just have to type `npm start` and it will run: mysql, prisma, server and client inside Docker.

## Client
Code is in the `client` directory.
It's a create-react-app with Apollo.

You can access it via http://localhost:3000

## Server
Code is in the `server` directory.
It's performed by GraphQL Yoga.

You can access your server GraphQL playground via http://localhost:4000

## Prisma
Code is in the `server/prisma` directory.

You can access your Prisma Studio via http://localhost:PRISMA_PORT

Generate a `token`

    ❯ cd server/prisma && prisma2 token

Deploy `prisma`

  - When you make change to your schema

    ❯ cd server/prisma && prisma2 lift save

  - When you want to push your changes

    ❯ cd server/prisma && prisma2 lift up

# CRAPrisma - Create React App with Prisma

## Prerequisites
  - Install Docker for your OS
  - Install Prisma

    ❯ npm i -g prisma

  - Create your `.env` files and set your env

    ❯ cp .env.example .env
    ❯ cp server/prisma/.env.example server/prisma/.env

  - Generate the `prisma-client` and deploy it

    ❯ cd server/prisma && prisma generate
    ❯ prisma deploy

## Run
You just have to type `npm start` and it will run both client and server inside Docker.

## Client
Code is in the `client` directory.
It's a create-react-app with Apollo.

You can access it via http://localhost:3000

## Server
Code is in the `server` directory.

You can access it via http://localhost:4000

## Prisma
Code is in the `server/prisma` directory.

Generate a token `cd server/prisma && prisma token`

You can access your GraphQL playground via http://localhost:4466
You can manage your data via http://localhost:4466/_admin

# Create React Prisma App

## Prerequisites
  - Install Docker for your OS
  - Install Prisma
    ❯ npm i -g prisma

## Run
You just have to type `npm start` and it will run both client and server inside Docker.

## Client
Code is in the `client` directory.
It's a create-react-app with Apollo.

You can access it via http://localhost:3000

## Server
Code is in the `server` directory.

You can access it via http://localhost:4000. You will have a GraphQL playground.

## Deploy
`Now.sh` is used for easy deployment (each PR is deployed).
If you want to deploy, just type :

    ❯ now

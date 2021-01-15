require('dotenv').config()

const { GraphQLServer, PubSub } = require('graphql-yoga')
const { nexusSchemaPrisma } = require('nexus-plugin-prisma/schema')
const { makeSchema } = require('@nexus/schema')
const cookieParser = require('cookie-parser')
const { verify } = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const types = require('./types')
const { permissions } = require('./permissions')

const server = new GraphQLServer({
  schema: makeSchema({
    types,
    plugins: [nexusSchemaPrisma()],
    outputs: {
      schema: `${process.cwd()}/src/generated/schema.graphql`,
      typegen: `${process.cwd()}/src/generated/nexus.ts`,
    },
    typegenAutoConfig: {
      sources: [
        {
          source: '@prisma/client',
          alias: 'prisma'
        }
      ]
    },
  }),
  middlewares: [permissions],
  context: request => ({
    ...request,
    prisma: new PrismaClient(),
    pubsub: new PubSub(),
  }),
})

server.express.use(cookieParser())

server.express.use((request, response, next) => {
  const { token } = request.cookies
  if (token) {
    const { userId } = verify(token, process.env.APP_SECRET)
    request.userId = userId
  }
  next()
})

server.start(
  {
    endpoint: '/graphql',
    playground: '/graphql',
    cors: {
      credentials: true,
      origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000',
    },
  },
  () => console.log(`Server is running on ${process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://localhost:4000/graphql'}`)
)

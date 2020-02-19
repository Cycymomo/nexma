require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga')
const cookieParser = require('cookie-parser')
const { verify } = require('jsonwebtoken')

const { prisma } = require('./prisma-client')
const { resolvers } = require('./resolvers')
const { permissions } = require('./permissions')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: request => ({
    ...request,
    prisma,
  }),
})

server.express.use(cookieParser())

server.express.use((request, response, next) => {
  const { token } = request.cookies
  if (token) {
    const { userId } = verify(token, process.env.PRISMA_MANAGEMENT_API_SECRET)
    request.userId = userId
  }
  next()
})

server.start(
  {
    port: 4000,
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL,
    },
  },
  () => console.log(`Server is running on ${process.env.SERVER_URL}`)
)

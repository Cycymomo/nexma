require('dotenv').config()
const { prisma } = require('./prisma-client')
const { GraphQLServer } = require('graphql-yoga')
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
server.start(() => console.log('Server is running on http://localhost:4000'))

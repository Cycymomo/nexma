const { prisma } = require('./prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers.js')

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))

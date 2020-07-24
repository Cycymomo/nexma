const { queryField, stringArg } = require('@nexus/schema')

const feed = queryField('feed', {
  type: 'Post',
  list: true,
  resolve: (parent, args, context) => {
    return context.prisma.post.findMany({
      where: { published: true },
    })
  },
})

const post = queryField('post', {
  type: 'Post',
  args: {
    id: stringArg(),
  },
  resolve: (parent, { id }, context) => {
    return context.prisma.post.findOne({
      where: { id },
    })
  },
})

module.exports = {
  feed,
  post,
}

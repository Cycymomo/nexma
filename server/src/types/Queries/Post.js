const { queryField } = require('@nexus/schema')

const feed = queryField('feed', {
  type: 'Post',
  list: true,
  resolve: (parent, args, context) => {
    return context.prisma.post.findMany({
      where: { published: true },
    })
  },
})

module.exports = {
  feed,
}

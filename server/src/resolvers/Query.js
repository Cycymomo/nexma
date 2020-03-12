const Query = {
  me: (parent, args, context) => {
    if (!context.request.userId) {
      return null;
    }
    return context.prisma.user({ id: context.request.userId })
  },
  feed: (parent, args, context) => {
    return context.prisma.posts({ where: { published: true } })
  },
}

module.exports = {
  Query,
}

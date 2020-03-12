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
  filterPosts: (parent, { searchString }, context) => {
    return context.prisma.posts({
      where: {
        OR: [
          {
            title_contains: searchString,
          },
          {
            content_contains: searchString,
          },
        ],
      },
    })
  },
}

module.exports = {
  Query,
}

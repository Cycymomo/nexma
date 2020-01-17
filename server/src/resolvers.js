const resolvers = {
  Query: {
    publishedPosts(root, args, context) {
      return context.prisma.posts({ where: { published: true } })
    },
    post(root, args, context) {
      return context.prisma.post({ id: args.postId })
    },
    postsByUser(root, args, context) {
      return context.prisma
        .user({
          id: args.userId,
        })
        .posts()
    },
  },
  Mutation: {
    createDraft(root, args, context) {
      return context.prisma.createPost({
        title: args.title,
        author: {
          connect: { id: args.userId },
        },
      })
    },
    publish(root, args, context) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: { published: true },
      })
    },
    signup(root, { name, email, password }, context) {
      return context.prisma.signup({ name, email, password })
    },
  },
  User: {
    posts(root, args, context) {
      return context.prisma
        .user({
          id: root.id,
        })
        .posts()
    },
  },
  Post: {
    author(root, args, context) {
      return context.prisma
        .post({
          id: root.id,
        })
        .author()
    },
  },
}

module.exports = resolvers

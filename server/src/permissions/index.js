const { rule, and, shield } = require('graphql-shield')

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    return Boolean(context.request.userId)
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    const { authorId } = await context.prisma.post({ id }).author()
    return context.request.userId === authorId
  }),
}

const permissions = shield({
  Query: {
    filterPosts: rules.isAuthenticatedUser,
    post: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
  },
})

module.exports = {
  permissions,
}

const { rule, shield, allow, not } = require('graphql-shield')

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    return Boolean(context.request.userId)
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    const { id: authorId } = await context.prisma.post.findOne({
      where: { id }
    })
    .author()

    return context.request.userId === authorId
  }),
  isCommentOwner: rule()(async (parent, { id }, context) => {
    const { id: authorId } = await context.prisma.comment.findOne({
      where: { id }
    })
    .author()

    return context.request.userId === authorId
  }),
}

const permissions = shield({
  Subscription: {
    commentAdded: allow,
  },
  Query: {
    me: allow,
    feed: allow,
    post: allow,
  },
  Mutation: {
    signup: not(rules.isAuthenticatedUser),
    login: not(rules.isAuthenticatedUser),
    logout: rules.isAuthenticatedUser,
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
    createComment: rules.isAuthenticatedUser,
    deleteComment: rules.isCommentOwner,
  },
})

module.exports = {
  permissions,
}

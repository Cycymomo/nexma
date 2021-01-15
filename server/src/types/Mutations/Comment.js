const { stringArg, mutationField } = require('@nexus/schema')

const createComment = mutationField('createComment', {
  type: 'Comment',
  args: {
    content: stringArg({ nullable: true }),
    postId: stringArg({ nullable: false }),
  },
  resolve: async (parent, { content, postId }, context) => {
    const commentAdded = await context.prisma.comment.create({
      data: {
        content,
        author: { connect: { id: Number(context.request.userId) } },
        post: { connect: { id: postId } },
      },
    })
    await context.pubsub.publish('COMMENT_ADDED', { commentAdded })

    return commentAdded
  },
})

const deleteComment = mutationField('deleteComment', {
  type: 'Comment',
  nullable: true,
  args: { id: stringArg() },
  resolve: (parent, { id }, context) => {
    return context.prisma.comment.delete({
      where: { id },
    })
  },
})

module.exports = {
  createComment,
  deleteComment,
}

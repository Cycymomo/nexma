const { stringArg, mutationField } = require('@nexus/schema')

const createDraft = mutationField('createDraft', {
  type: 'Post',
  args: {
    title: stringArg(),
    content: stringArg({ nullable: true }),
  },
  resolve: (parent, { title, content }, context) => {
    return context.prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: Number(context.request.userId) } },
      },
    })
  },
})

const deletePost = mutationField('deletePost', {
  type: 'Post',
  nullable: true,
  args: { id: stringArg() },
  resolve: (parent, { id }, context) => {
    return context.prisma.post.delete({
      where: { id },
    })
  },
})

const publish = mutationField('publish', {
  type: 'Post',
  nullable: true,
  args: { id: stringArg() },
  resolve: (parent, { id }, context) => {
    return context.prisma.post.update({
      where: { id },
      data: { published: true },
    })
  },
})

module.exports = {
  createDraft,
  deletePost,
  publish,
}

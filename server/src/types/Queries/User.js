const { queryField } = require('@nexus/schema')

const me = queryField('me', {
  type: 'User',
  nullable: true,
  resolve: (parent, args, context) => {
    if (context.request.userId) {
      return context.prisma.user.findOne({
        where: {
          id: context.request.userId,
        },
      })
    }
  },
})

module.exports = {
  me,
}

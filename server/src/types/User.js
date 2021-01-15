const { objectType } = require('@nexus/schema')

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts({ pagination: false })
    t.model.comments({ pagination: false })
    t.model.createdAt()
    t.model.updatedAt()
  },
})

module.exports = {
  User,
}

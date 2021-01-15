const { objectType } = require('@nexus/schema')

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.content()
    t.model.author()
    t.model.post()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

module.exports = {
  Comment,
}

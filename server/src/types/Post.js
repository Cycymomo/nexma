const { objectType } = require('@nexus/schema')

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.published()
    t.model.title()
    t.model.content()
    t.model.author()
    t.model.comments({ pagination: false })
    t.model.createdAt()
    t.model.updatedAt()
  },
})

module.exports = {
  Post,
}

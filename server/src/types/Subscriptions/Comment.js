const { withFilter } = require('graphql-yoga')
const { stringArg, subscriptionField } = require('@nexus/schema')

const commentAdded = subscriptionField('commentAdded', {
	type: 'Comment',
	nullable: true,
	args: {
		postId: stringArg({ required: true })
	},
	subscribe: withFilter(
		(parent, args, context) => context.pubsub.asyncIterator('COMMENT_ADDED'),
		(payload, { postId }) => payload.commentAdded.postId === postId
	)
})

module.exports = {
  commentAdded,
}

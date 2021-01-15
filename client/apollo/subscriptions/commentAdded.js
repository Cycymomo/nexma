import { gql } from 'apollo-boost'

const commentAddedSubscription = gql`
  subscription commentAdded($postId: String!) {
    commentAdded(postId: $postId) {
      id
      content
      author {
        name
      }
      post {
        id
      }
      createdAt
      updatedAt
    }
  }
`

export default commentAddedSubscription

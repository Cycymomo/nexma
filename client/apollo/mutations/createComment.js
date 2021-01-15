import { gql } from 'apollo-boost'

const createCommentMutation = gql`
  mutation createComment($content: String!, $postId: String!) {
    createComment(content: $content, postId: $postId) {
      id
    }
  }
`

export default createCommentMutation

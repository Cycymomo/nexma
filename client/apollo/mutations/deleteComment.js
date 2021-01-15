import { gql } from 'apollo-boost'

const deleteCommentMutation = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`

export default deleteCommentMutation

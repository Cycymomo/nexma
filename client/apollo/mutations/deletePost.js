import { gql } from 'apollo-boost'

const deletePostMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default deletePostMutation

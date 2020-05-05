import { gql } from 'apollo-boost'

const deletePostMutation = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default deletePostMutation

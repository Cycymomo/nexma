import { gql } from 'apollo-boost'

const postQuery = gql`
  query post($id: String!) {
    post(id: $id) {
      id
      published
      title
      content
      author {
        name
      }
      createdAt
      updatedAt
    }
  }
`

export default postQuery

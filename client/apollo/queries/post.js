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
      comments {
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
      createdAt
      updatedAt
    }
  }
`

export default postQuery

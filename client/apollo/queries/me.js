import { gql } from 'apollo-boost'

const meQuery = gql`
  query me {
    me {
      id
      email
      name
      posts {
        id
        title
        content
        published
        createdAt
        updatedAt
      }
      comments {
        id
        content
        post {
          id
          title
        }
        createdAt
        updatedAt
      }
    }
  }
`

export default meQuery

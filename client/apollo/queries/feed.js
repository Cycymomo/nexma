import { gql } from 'apollo-boost'

const feedQuery = gql`
  query feed {
    feed {
      id
      title
      author {
        name
      }
      createdAt
      updatedAt
    }
  }
`

export default feedQuery

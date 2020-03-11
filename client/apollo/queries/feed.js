import { gql } from 'apollo-boost'

const feedQuery = gql`
  query feed {
    feed {
      id
      title
      content
      published
      author {
        name
      }
      createdAt
      updatedAt
    }
  }
`

export default feedQuery

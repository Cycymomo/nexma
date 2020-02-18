import { gql } from 'apollo-boost'

const meQuery = gql`
  query me {
    me {
      id
      email
      name
      posts {
        title
      }
    }
  }
`

export default meQuery

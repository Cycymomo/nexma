import { gql } from 'apollo-boost'

const loggedinUserQuery = gql`
  query loggedInUser {
    loggedInUser {
      id
    }
  }
`

export default loggedinUserQuery

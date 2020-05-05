import { gql } from 'apollo-boost'

const logoutMutation = gql`
  mutation logout {
    logout
  }
`

export default logoutMutation

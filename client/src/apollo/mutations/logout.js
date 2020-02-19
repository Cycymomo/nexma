import { gql } from 'apollo-boost'

const logoutMutation = gql`
  mutation logout {
    logout {
      message
    }
  }
`

export default logoutMutation

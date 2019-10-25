import { gql } from 'apollo-boost'

const authenticateUserMutation = gql`
  mutation authenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

export default authenticateUserMutation

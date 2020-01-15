import { gql } from 'apollo-boost'

const signupUserMutation = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      token
    }
  }
`

export default signupUserMutation

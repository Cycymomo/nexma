import { gql } from 'apollo-boost'

const signupUserMutation = gql`
  mutation signupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`

export default signupUserMutation

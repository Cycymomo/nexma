import { gql } from 'apollo-boost'

const signupMutation = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`

export default signupMutation

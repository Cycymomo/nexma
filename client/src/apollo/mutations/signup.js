import { gql } from 'apollo-boost'

const signupMutation = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`

export default signupMutation

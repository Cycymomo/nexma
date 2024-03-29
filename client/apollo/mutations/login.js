import { gql } from 'apollo-boost'

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
    }
  }
`

export default loginMutation

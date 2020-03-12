import { gql } from 'apollo-boost'

const publishMutation = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
    }
  }
`

export default publishMutation

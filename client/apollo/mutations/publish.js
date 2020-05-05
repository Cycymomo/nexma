import { gql } from 'apollo-boost'

const publishMutation = gql`
  mutation publish($id: String!) {
    publish(id: $id) {
      id
    }
  }
`

export default publishMutation

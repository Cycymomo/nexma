import { gql } from 'apollo-boost'

const createDraftMutation = gql`
  mutation createDraft($title: String!, $content: String!) {
    createDraft(title: $title, content: $content) {
      id
    }
  }
`

export default createDraftMutation

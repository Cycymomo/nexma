import { useMutation } from '@apollo/react-hooks'

import createDraftMutation from '../apollo/mutations/createDraft'

export default function Post() {
  const [createDraft, { loading, error }] = useMutation(createDraftMutation)

  const handleCreateDraft = event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    const content = formData.get('content')
    form.reset()

    createDraft({ variables: { title, content } })
  }

  return (
    <form onSubmit={handleCreateDraft}>
      <h1>Create Draft</h1>
      { error ? <p>Error: {JSON.stringify(error)}</p> : '' }
      <input placeholder="title" name="title" type="text" required />
      <textarea placeholder="Enter your content" rows="10" cols="33" required></textarea>
      <button type="submit" disabled={loading}>
        Create
      </button>
    </form>
  )
}

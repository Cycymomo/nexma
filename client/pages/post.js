import { useMutation } from '@apollo/react-hooks'
import Router from 'next/router'

import createDraftMutation from '../apollo/mutations/createDraft'
import meQuery from '../apollo/queries/me'

export default function Post() {
  const [createDraft, { loading, error }] = useMutation(createDraftMutation)

  const handleCreateDraft = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    const content = formData.get('content')

    await createDraft({ variables: { title, content }, refetchQueries: [{ query: meQuery }] })

    form.reset()
    Router.push('/profile')
  }

  return (
    <form onSubmit={handleCreateDraft}>
      <h1>Create Draft</h1>
      { error ? <p>Error: {JSON.stringify(error)}</p> : '' }
      <input placeholder="title" name="title" type="text" required />
      <textarea placeholder="Enter your content" name="content" rows="10" cols="33" required></textarea>
      <button type="submit" disabled={loading}>
        Create
      </button>
    </form>
  )
}

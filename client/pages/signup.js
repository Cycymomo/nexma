import { useMutation } from '@apollo/react-hooks'
import Router from 'next/router'

import signupMutation from '../apollo/mutations/signup'
import meQuery from '../apollo/queries/me'

export default function SignUp() {
  const [signup, { loading, error }] = useMutation(signupMutation)

  const handleSignUp = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    await signup({ variables: { name, email, password }, refetchQueries: [{ query: meQuery }] })

    form.reset()
    Router.push('/profile')
  }

  return (
    <form onSubmit={handleSignUp}>
      <h1>Sign Up</h1>
      { error ? <p>Error: {JSON.stringify(error)}</p> : '' }
      <input placeholder="name" name="name" type="text" required />
      <input placeholder="email" name="email" type="text" required />
      <input placeholder="password" name="password" type="password" required />
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
    </form>
  )
}

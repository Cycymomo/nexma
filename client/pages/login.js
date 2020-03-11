import { useMutation } from '@apollo/react-hooks'
import Router from 'next/router'

import loginMutation from '../apollo/mutations/login'
import meQuery from '../apollo/queries/me'

export default function Login() {
  const [login, { loading, error }] = useMutation(loginMutation)

  const handleLogin = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const email = formData.get('email')
    const password = formData.get('password')

    await login({ variables: { email, password }, refetchQueries: [{ query: meQuery }] })

    form.reset()
    Router.push('/profile')
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      { error ? <p>Error: {JSON.stringify(error)}</p> : '' }
      <input placeholder="email" name="email" type="text" required />
      <input placeholder="password" name="password" type="password" required />
      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  )
}

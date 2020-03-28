import React from 'react'
import Head from 'next/head'
import { useMutation } from '@apollo/react-hooks'
import Router from 'next-translate/Router'
import useTranslation from 'next-translate/useTranslation'

import Nav from '../components/Nav'
import Error from '../components/Error'

import signupMutation from '../apollo/mutations/signup'
import meQuery from '../apollo/queries/me'

export default function SignUp() {
  const { t, lang } = useTranslation()
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
    Router.pushI18n('/profile')
  }

  return (
    <>
      <Head>
        <title>{ t('common:menu-signup') }</title>
      </Head>
      <Nav></Nav>
      <form onSubmit={handleSignUp}>
        <h1>{ t('common:menu-signup') }</h1>
        <Error type="signup" error={error ? JSON.stringify(error) : ''} />
        <input placeholder={ t('authent:enter-name') } name="name" type="text" required />
        <input placeholder={ t('authent:enter-email') } name="email" type="text" required />
        <input placeholder={ t('authent:enter-password') } name="password" type="password" required />
        <button type="submit" disabled={loading}>
          { t('common:action-signup') }
        </button>
      </form>
    </>
  )
}

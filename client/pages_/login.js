import React from 'react'
import Head from 'next/head'
import { useMutation } from '@apollo/react-hooks'
import Router from 'next-translate/Router'
import useTranslation from 'next-translate/useTranslation'

import Nav from '../components/Nav'
import Error from '../components/Error'

import loginMutation from '../apollo/mutations/login'
import meQuery from '../apollo/queries/me'

export default function Login() {
  const { t, lang } = useTranslation()
  const [login, { loading, error }] = useMutation(loginMutation)

  const handleLogin = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const email = formData.get('email')
    const password = formData.get('password')

    await login({ variables: { email, password }, refetchQueries: [{ query: meQuery }] })

    form.reset()
    Router.pushI18n('/profile')
  }

  return (
    <>
      <Head>
        <title>{ t('common:menu-login') }</title>
      </Head>
      <Nav></Nav>
      <form onSubmit={handleLogin}>
        <h1>{ t('common:menu-login') }</h1>
        <Error type="login" error={error ? JSON.stringify(error) : ''} />
        <input placeholder={ t('authent:enter-email') } name="email" type="text" required />
        <input placeholder={ t('authent:enter-password') } name="password" type="password" required />
        <button type="submit" disabled={loading}>
          { t('common:action-login') }
        </button>
      </form>
    </>
  )
}

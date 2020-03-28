import React from 'react'
import Head from 'next/head'
import { useMutation } from '@apollo/react-hooks'
import Router from 'next-translate/Router'
import useTranslation from 'next-translate/useTranslation'

import Nav from '../components/Nav'
import Error from '../components/Error'

import createDraftMutation from '../apollo/mutations/createDraft'
import meQuery from '../apollo/queries/me'

export default function Post() {
  const { t, lang } = useTranslation()
  const [createDraft, { loading, error }] = useMutation(createDraftMutation)

  const handleCreateDraft = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    const content = formData.get('content')

    await createDraft({ variables: { title, content }, refetchQueries: [{ query: meQuery }] })

    form.reset()
    Router.pushI18n('/profile')
  }

  return (
    <>
      <Head>
        <title>{ t('common:menu-add-post') }</title>
      </Head>
      <Nav></Nav>
      <form onSubmit={ handleCreateDraft }>
        <h1>{ t('common:menu-add-post') }</h1>
        <Error type="draft" error={ error ? JSON.stringify(error) : '' } />
        <input placeholder={ t('post:enter-title') } name="title" type="text" required />
        <textarea placeholder={ t('post:enter-content') } name="content" rows="10" cols="33" required></textarea>
        <button type="submit" disabled={ loading }>
          { t('common:action-create') }
        </button>
      </form>
    </>
  )
}

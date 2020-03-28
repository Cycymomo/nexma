import React from 'react'
import Head from 'next/head'
import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import useTranslation from 'next-translate/useTranslation'

import Nav from '../components/Nav'
import Post from '../components/Post'
import Loading from '../components/Loading'
import Error from '../components/Error'

import meQuery from '../apollo/queries/me'
import publishMutation from '../apollo/mutations/publish'
import deletePostMutation from '../apollo/mutations/deletePost'

import css from "../styles/profile.css"

export default function Profile() {
  const { t, lang } = useTranslation()
  const [mode, setMode] = useState('draft')
  const { data: { me } = {}, loading, error, refetch } = useQuery(meQuery)
  const [publish, { loading: loadingPublish, error: errorPublish }] = useMutation(publishMutation, {
    onCompleted() {
      refetch()
    }
  })
  const [deletePost, { loading: loadingDelete, error: errorDelete }] = useMutation(deletePostMutation, {
    onCompleted() {
      refetch()
    }
  })

  if (loading) {
    return <Loading />
  }

  if (!me) {
    return null
  }

  return (
    <>
      <Head>
        <title>{ t('common:menu-profile') }</title>
      </Head>
      <Nav></Nav>
      <h1>{ t('profile:hi-username', { name: me.name }) }</h1>
      <Error type="profile" error={error ? JSON.stringify(error) : ''} />
      <div>
        { t('profile:email', { email: me.email }) }
      </div>
      <h1>{ t('profile:title-posts') }</h1>
      <div>
        <div>{ t('profile:content-posts', { count: me.posts.length }) }</div>
        <div>
          <button style={{ color: mode === 'draft' ? 'blue' : 'black' }} onClick={() => setMode('draft')}>{ t('profile:title-drafts') }</button>
          <button style={{ color: mode === 'published' ? 'blue' : 'black' }} onClick={() => setMode('published')}>{ t('profile:title-published') }</button>
        </div>
      </div>
      <div className={css.posts}>
        <Error type="publish" error={errorPublish ? JSON.stringify(errorPublish) : ''} />
        <Error type="delete" error={errorDelete ? JSON.stringify(errorDelete) : ''} />
        {
          me.posts
            .filter(({ published }) => mode === 'published' ? published : !published)
            .map(post => (
              <Post key={post.id} post={post} publish={publish} loadingPublish={loadingPublish} deletePost={deletePost} loadingDelete={loadingDelete} />
            ))
        }
      </div>
    </>
  )
}

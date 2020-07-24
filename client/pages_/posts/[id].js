import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

import Post from '../../components/Post'
import Loading from '../../components/Loading'
import Nav from '../../components/Nav'
import Error from '../../components/Error'

import postQuery from '../../apollo/queries/post'

export default function Posts() {
  const { query: { id } } = useRouter()
  const { data: { post } = {}, loading, error } = useQuery(postQuery, { variables: { id } })

  if (loading) {
    return <Loading />
  }

  if (!post && error) {
    return <Error type="post" error={error ? JSON.stringify(error) : ''} />
  }

  return (
    <>
      <Head>
        <title>{ post.title }</title>
      </Head>
      <Nav></Nav>
      <div>
        <Post key={post.id} post={post} />
      </div>
    </>
  )
}

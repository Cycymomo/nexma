import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Post from '../components/Post'

import meQuery from '../apollo/queries/me'
import publishMutation from '../apollo/mutations/publish'
import deletePostMutation from '../apollo/mutations/deletePost'

import css from "../styles/profile.css"

export default function Profile() {
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
    return <p>Loading...</p>
  }

  if (!me) {
    return null
  }

  return (
    <>
      <h1>Hi, { me.name }</h1>
      { error ? <p>Error: {JSON.stringify(error)}</p> : '' }
      <div>
        Email: { me.email }
      </div>
      <h1>Posts</h1>
      <div>
        <div>You have { me.posts.length } post(s).</div>
        <div>
          <button style={{ color: mode === 'draft' ? 'blue' : 'black' }} onClick={() => setMode('draft')}>Drafts</button>
          <button style={{ color: mode === 'published' ? 'blue' : 'black' }} onClick={() => setMode('published')}>Published</button>
        </div>
      </div>
      <div className={css.posts}>
        { errorPublish ? <p>Publish error: {JSON.stringify(errorPublish)}</p> : '' }
        { errorDelete ? <p>Delete error: {JSON.stringify(errorDelete)}</p> : '' }
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

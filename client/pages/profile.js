import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import meQuery from '../apollo/queries/me'

export default function Profile() {
  const [mode, setMode] = useState('draft')
  const { data: { me } = {}, loading, error } = useQuery(meQuery, { fetchPolicy: 'network-only' })

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
      <div style={{ width: '800px', padding: '20px' }}>
        {
          me.posts
            .filter(post => mode === 'published' ? post.published : !post.published)
            .map(({ id, title, content, published, createdAt, updatedAt }) => (
              <div key={id} style={{ display: 'inline-block', verticalAlign: 'top', width: '200px', height: '200px', border: 'solid thin black', padding: '20px', margin: '20px' }}>
                <div>{ title }</div>
                <div style={{ color: 'grey', fontSize: '10px' }}>{ createdAt }</div>
                <div style={{ textAlign: 'left', paddingTop: '10px' }}>{ content }</div>
              </div>
            ))
        }
      </div>
    </>
  )
}

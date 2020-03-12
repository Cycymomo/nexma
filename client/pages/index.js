import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'

import Post from '../components/Post'

import feedQuery from '../apollo/queries/feed'

export default function Home() {
  const [search, setSearch] = useState('')
  const { data: { feed } = {}, loading, error } = useQuery(feedQuery)
  let renderFeed = feed

  if (loading) {
    return <p>Loading...</p>
  }

  if (!feed) {
    return null
  }

  if (search) {
    renderFeed = feed.filter(({ title }) => title.includes(search))
  }

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        { error ? <p>Error: {JSON.stringify(error)}</p> : '' }
        <div>
          <input
            placeholder="Search a title..." name="search" type="text" required
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div>
          {
            renderFeed && renderFeed.length > 0
              ? renderFeed.map(post => <Post key={post.id} post={post} />)
              : (
                search ? <>No results.</> : <>No published post yet.</>
              )
          }
        </div>
      </div>
    </div>
  )
}

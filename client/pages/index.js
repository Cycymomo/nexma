import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'

import Post from '../components/Post'

import feedQuery from '../apollo/queries/feed'

export default function Home() {
  const { data: { feed } = {}, loading, error } = useQuery(feedQuery)

  if (loading) {
    return <p>Loading...</p>
  }

  if (!feed) {
    return null
  }

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        { error ? <p>Error: {JSON.stringify(error)}</p> : '' }
        {
          feed && feed.length > 0
            ? feed.map(post => <Post key={post.id} post={post} />)
            : (<>No published post yet.</>)
        }
      </div>
    </div>
  )
}

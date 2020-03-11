import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'

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
            ? feed.map(({ author: { name }, title, content, createdAt, updatedAt }) => (
                <>
                  <div>
                    A post from { name } created at { createdAt } { updatedAt ? `(edited at ${ updatedAt })` : '' }
                  </div>
                  <div>
                    { title }
                  </div>
                  <div>
                    { content }
                  </div>
                </>
              ))
            : (<>No post yet.</>)
        }
      </div>
    </div>
  )
}

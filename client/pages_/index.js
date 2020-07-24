import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Nav from '../components/Nav'

import feedQuery from '../apollo/queries/feed'

export default function Home() {
  const { t, lang } = useTranslation()
  const [search, setSearch] = useState('')
  const { data: { feed } = {}, loading, error } = useQuery(feedQuery)
  let renderFeed = feed

  if (loading) {
    return <Loading />
  }

  if (!feed) {
    return null
  }

  if (search) {
    renderFeed = feed.filter(({ title }) => title.includes(search))
  }

  return (
    <>
      <Head>
        <title>{ t('common:menu-home') }</title>
      </Head>
      <Nav></Nav>
      <div>
        <Error type="feed" error={error ? JSON.stringify(error) : ''} />
        <div>
          <input
            placeholder={ t('home:search-title') } name="search" type="text" required
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div>
          <ul>
            {
              renderFeed && renderFeed.length > 0
                ? renderFeed.map(({ id, title, author: { name } = {}, createdAt }) => (
                  <li key={id}>
                    <Link href="/posts/[id]" as={`/posts/${id}`}>
                      <a>{ title }</a>
                    </Link>
                    <small>
                    , { name && <>{ t('common:post-from', { name }) }, { createdAt }</> }
                    </small>
                  </li>
                ))
                : (
                  search ? <li>{ t('home:no-results') }</li> : <li>{ t('home:no-published') }</li>
                )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

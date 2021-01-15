import Router from 'next-translate/Router'
import useTranslation from 'next-translate/useTranslation'

import Error from './Error'
import Comment from './Error'

import feedQuery from '../apollo/queries/feed'

export default function Post({
  post: { id, title, content, published, createdAt, updatedAt, author: { name } = {} },
  publish, loadingPublish, deletePost, loadingDelete
}) {
  const { t, lang } = useTranslation()
  const params = { variables: { id }, refetchQueries: [{ query: feedQuery }] }

  return (
    <>
      <div className="post">
        <h1>{ title }</h1>
        { name && <div>{ t('common:post-from', { name }) }</div> }
        <div className="date">{ createdAt }</div>
        <div className="content">{ content }</div>
        <div className="action">
          { !published && publish && <button onClick={() => publish(params)} disabled={loadingPublish}>{ t('common:action-publish') }</button> }
          { deletePost && <button className="delete" onClick={() => deletePost(params)} disabled={loadingDelete}>{ t('common:action-delete') }</button> }
        </div>
      </div>
    </>
  )
}

import useTranslation from 'next-translate/useTranslation'

import feedQuery from '../apollo/queries/feed'
import css from "../styles/components/post.css"

export default function Post({
  post: { id, title, content, published, createdAt, updatedAt, author: { name } = {} },
  publish, loadingPublish, deletePost, loadingDelete
}) {
  const { t, lang } = useTranslation()
  const params = { variables: { id }, refetchQueries: [{ query: feedQuery }] }

  return (
    <div className={css.post}>
      <h1>{ title }</h1>
      { name && <div>{ t('common:post-from', { name }) }</div> }
      <div className={css.date}>{ createdAt }</div>
      <div className={css.content}>{ content }</div>
      <div className={css.action}>
        { !published && publish && <button onClick={() => publish(params)} disabled={loadingPublish}>{ t('common:action-publish') }</button> }
        { deletePost && <button className={css.delete} onClick={() => deletePost(params)} disabled={loadingDelete}>{ t('common:action-delete') }</button> }
      </div>
    </div>
  )
}

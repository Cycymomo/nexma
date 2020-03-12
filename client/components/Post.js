import css from "../styles/components/post.css"

import feedQuery from '../apollo/queries/feed'

export default function Post({
  post: { id, title, content, published, createdAt, updatedAt, author: { name } = {} },
  publish, loadingPublish, deletePost, loadingDelete
}) {
  return (
    <div className={css.post}>
      <div>{ title }</div>
      { name && <div>A post from { name }</div> }
      <div className={css.date}>{ createdAt }</div>
      <div className={css.content}>{ content }</div>
      <div className={css.action}>
        { !published && publish && <button onClick={() => publish({ variables: { id }, refetchQueries: [{ query: feedQuery }] })} disabled={loadingPublish}>Publish</button> }
        { deletePost && <button onClick={() => deletePost({ variables: { id }, refetchQueries: [{ query: feedQuery }] })} style={{ color: 'red' }} disabled={loadingDelete}>Delete</button> }
      </div>
    </div>
  )
}

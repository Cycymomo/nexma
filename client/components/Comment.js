import useTranslation from 'next-translate/useTranslation'
import postQuery from '../apollo/queries/post'

export default function Comment({
  comment: { id, content, author: { name } = {}, post: { id: postId }, createdAt, updatedAt },
  deleteComment, loadingDelete
}) {
  const { t, lang } = useTranslation()
  const params = { variables: { id }, refetchQueries: [{ query: postQuery, variables: { id: postId } }] }

  return (
    <>
      <div className="comment">
        { content }
      </div>
      <small>{ name }, at { createdAt } (edit { updatedAt })</small>
      { deleteComment && <button className="delete" onClick={() => deleteComment(params)} disabled={loadingDelete}>{ t('common:action-delete') }</button> }
    </>
  )
}

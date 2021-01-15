import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import useTranslation from 'next-translate/useTranslation'

import Post from '../../components/Post'
import Comment from '../../components/Comment'
import Loading from '../../components/Loading'
import Nav from '../../components/Nav'
import Error from '../../components/Error'

import postQuery from '../../apollo/queries/post'
import createCommentMutation from '../../apollo/mutations/createComment'
import commentAddedSubscription from '../../apollo/subscriptions/commentAdded'
import deleteCommentMutation from '../../apollo/mutations/deleteComment'

export default function Posts() {
  const { t, lang } = useTranslation()
  const { query: { id } } = useRouter()

  if (!id) {
    return <></>
  }

  const { data: { post } = {}, loading, error, refetch } = useQuery(postQuery, { variables: { id } })
  const [createComment, { loadingComment, errorComment }] = useMutation(createCommentMutation)
  const {
    data: { commentAdded } = {},
    loadingCommentAdded,
  } = useSubscription(commentAddedSubscription, { variables: { postId: id } })
  const [deleteComment, { loading: loadingDelete, error: errorDelete }] = useMutation(deleteCommentMutation, {
    onCompleted() {
      refetch()
    }
  })

  if (loading) {
    return <Loading />
  }

  if (!post && error) {
    return <Error type="post" error={error ? JSON.stringify(error) : ''} />
  }

  if (errorComment) {
    return <Error type="comment" error={errorComment ? JSON.stringify(errorComment) : ''} />
  }

  const handleCreateComment = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const content = formData.get('content')

    await createComment({ variables: { content, postId: id }, refetchQueries: [{ query: postQuery, variables: { id } }] })

    form.reset()
  }

  return (
    <>
      <Head>
        <title>{ post.title }</title>
      </Head>
      <Nav></Nav>
      <div>
        <Post key={post.id} post={post} />
      </div>
      <div className="comments">
        <form onSubmit={ handleCreateComment }>
          <Error type="draft" error={ error ? JSON.stringify(error) : '' } />
          <Error type="delete" error={ errorDelete ? JSON.stringify(errorDelete) : '' } />
          <textarea placeholder={ t('post:enter-comment') } name="content" rows="5" cols="30" required></textarea>
          <button type="submit" disabled={ loadingComment }>
            { t('common:action-create') }
          </button>
        </form>
        <h1>{ t('post:comments-list') }</h1>
        <div>
          <ul>
            { !loadingCommentAdded && commentAdded && <Comment key={commentAdded.id} comment={commentAdded} deleteComment={deleteComment} loadingDelete={loadingDelete} /> }
            {
              post.comments.length > 0
                ? post.comments.map(comment => (
                  <li key={comment.id}>
                    <Comment key={comment.id} comment={comment} deleteComment={deleteComment} loadingDelete={loadingDelete} />
                  </li>
                ))
                : <li>{ t('common:no-results') }</li>
            }
          </ul>
        </div>
      </div>
    </>
  )
}

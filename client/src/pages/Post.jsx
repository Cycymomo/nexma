import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import createDraftMutation from '../apollo/mutations/createDraft'

class Post extends Component {
  state = {
    title: 'My awesome post',
    content: 'Here my content',
    error: '',
  }

  createDraft = async createDraft => {
    const { title, content } = this.state
    try {
      await createDraft({
        variables: {
          title,
          content,
        },
      })

      this.setState({ title: '', content: '' })
      this.props.history.push('/profile')
    } catch ({ message: error }) {
      this.setState({ error })
    }
  }

  render() {
    const { title, content, error } = this.state
    return (
      <Mutation mutation={createDraftMutation}>
        {createDraft => (
          <div>
            <h1>Create a draft</h1>
            { error && <div style={{color: '#f00'}}>${error}</div> }
            <div>
              <input
                value={title}
                onChange={({ target: { value: title } }) => this.setState({ title })}
                type="text"
                placeholder="Enter your title"
              />
            </div>
            <div>
              <textarea
                rows="10" cols="33"
                onChange={({ target: { value: content } }) => this.setState({ content })}
                placeholder="Enter your content"
                value={content}
              />
            </div>
            <button
              onClick={() => this.createDraft(createDraft)}
            >
              Create
            </button>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Post

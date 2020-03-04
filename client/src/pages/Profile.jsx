import React, { Component } from 'react'
import { Query } from 'react-apollo'

import meQuery from '../apollo/queries/me'

class Profile extends Component {
  state = {
    mode: 'draft',
    error: '',
  }

  changeMode = (mode) => {
    this.setState({ mode })
  }

  render() {
    const { mode } = this.state
    return (
      <Query query={meQuery}>
        {({ data: { me } = {}, error }) => (
          <div>
            { error && <div style={{color: '#f00'}}>${error.message}</div> }
            {
              me && (
                <div>
                  <h1>Hi, { me.name }</h1>
                  <div>
                    Email: { me.email }
                  </div>
                  <h1>Posts</h1>
                  <div>
                    <div>You have { me.posts.length } post(s).</div>
                    <div>
                      <button style={{ color: mode === 'draft' ? 'blue' : 'black' }} onClick={() => this.changeMode('draft')}>Drafts</button>
                      <button style={{ color: mode === 'published' ? 'blue' : 'black' }} onClick={() => this.changeMode('published')}>Published</button>
                    </div>
                  </div>
                  <div style={{ width: '800px', padding: '20px' }}>
                    {
                      me.posts
                        .filter(post => mode === 'published' ? post.published : !post.published)
                        .map(({ id, title, content, published, createdAt, updatedAt }) => (
                          <div key={id} style={{ display: 'inline-block', verticalAlign: 'top', width: '200px', height: '200px', border: 'solid thin black', padding: '20px', margin: '20px' }}>
                            <div>{ title }</div>
                            <div style={{ color: 'grey', fontSize: '10px' }}>{ createdAt }</div>
                            <div style={{ textAlign: 'left', paddingTop: '10px' }}>{ content }</div>
                          </div>
                        ))
                    }
                  </div>
                </div>
              )
            }
          </div>
        )}
      </Query>
    )
  }
}

export default Profile

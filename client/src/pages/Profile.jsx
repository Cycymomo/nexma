import React, { Component } from 'react'
import { Query } from 'react-apollo'

import meQuery from '../apollo/queries/me'

class Profile extends Component {
  state = {
    error: '',
  }

  render() {
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
                  <div>
                    You have { me.posts.length } post(s).
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

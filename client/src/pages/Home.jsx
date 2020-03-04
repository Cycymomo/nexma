import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import feedQuery from '../apollo/queries/feed'

class Home extends Component {
  state = {
    error: '',
  }

  render() {
    return (
      <Query query={feedQuery}>
        {({ data: { feed } = {}, error }) => (
          <div>
            { error && <div style={{color: '#f00'}}>${error.message}</div> }
            {
              feed && feed.length > 0
                ? (
                  <div>
                    <div>
                      A post from { feed.author.name } created at { feed.createdAt } { feed.updatedAt ? `(edited at ${ feed.updatedAt })` : '' }
                    </div>
                    <div>
                      { feed.title }
                    </div>
                    <div>
                      { feed.content }
                    </div>
                  </div>
                )
                : (
                  <div>
                    Nothing shared yet.
                    <Link to="/post" href="/post">
                      Add a post
                    </Link>
                  </div>
                )
            }
          </div>
        )}
      </Query>
    )
  }
}

export default Home

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import authenticateUserMutation from '../apollo/mutations/authenticate-user'

class SignIn extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    userDidSignIn: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  signIn = async authenticateUser => {
    const { email, password } = this.state
    const {
      data: {
        authenticateUser: { token },
      },
    } = await authenticateUser({
      variables: {
        email,
        password,
      },
    })

    if (token) {
      this.props.userDidSignIn(token)
      this.props.history.push('/')
    }
    // @TODO handle error message ?
  }

  render() {
    const { email, password } = this.state
    return (
      <Mutation mutation={authenticateUserMutation}>
        {authenticateUser => (
          <div>
            <div>
              <input
                value={email}
                onChange={({ target: { value } }) => this.setState({ email: value })}
                type="text"
                placeholder="Enter your email"
              />
              <input
                value={password}
                onChange={({ target: { value } }) => this.setState({ password: value })}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button onClick={() => this.signIn(authenticateUser)}>Submit</button>
          </div>
        )}
      </Mutation>
    )
  }
}

export default SignIn

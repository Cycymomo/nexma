import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import loginMutation from '../apollo/mutations/login'

class Login extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    userDidLogin: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
    error: '',
  }

  login = async login => {
    const { email, password } = this.state
    try {
      const {
        data: {
          login: { token },
        },
      } = await login({
        variables: {
          email,
          password,
        },
      })

      this.props.userDidLogin(token)
      this.props.history.push('/')
    } catch ({ message: error }) {
      this.setState({ error })
    }
  }

  render() {
    const { email, password, error } = this.state
    return (
      <Mutation mutation={loginMutation}>
        {login => (
          <div>
            <h1>Login</h1>
            { error && <div style={{color: '#f00'}}>${error}</div> }
            <div>
              <input
                value={email}
                onChange={({ target: { value: email } }) => this.setState({ email })}
                type="text"
                placeholder="Enter your email"
              />
              <input
                value={password}
                onChange={({ target: { value: password } }) => this.setState({ password })}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button onClick={() => this.login(login)}>Submit</button>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Login

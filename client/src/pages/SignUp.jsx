import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import signupMutation from '../apollo/mutations/signup'

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    userDidSignUp: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    name: '',
    password: '',
    error: '',
  }

  signUp = async signup => {
    const { email, name, password } = this.state
    try {
      const {
        data: {
          signup: { token },
        },
      } = await signup({
        variables: {
          email,
          name,
          password,
        },
      })

      this.props.userDidSignUp(token)
      this.props.history.push('/')
    } catch ({ message: error }) {
      this.setState({ error })
    }
  }

  render() {
    const { email, name, password, error } = this.state
    return (
      <Mutation mutation={signupMutation}>
        {signup => (
          <div>
            <h1>Create an account</h1>
            { error && <div style={{color: '#f00'}}>${error}</div> }
            <div>
              <input
                value={name}
                onChange={({ target: { value: name } }) => this.setState({ name })}
                type="text"
                placeholder="Enter your name"
              />
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
            <button
              onClick={() => this.signUp(signup)}
            >
              Submit
            </button>
          </div>
        )}
      </Mutation>
    )
  }
}

export default SignUp

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import signupMutation from '../apollo/mutations/signup'

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    userDidLogin: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    email: '',
    password: '',
    error: '',
  }

  signUp = async signup => {
    const { name, email, password } = this.state
    try {
      await signup({
        variables: {
          name,
          email,
          password,
        },
      })

      this.setState({ name: '', email: '', password: '' })
      this.props.userDidLogin(name)
      this.props.history.push('/profile')
    } catch ({ message: error }) {
      this.setState({ error })
    }
  }

  render() {
    const { name, email, password, error } = this.state
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
            </div>
            <div>
              <input
                value={email}
                onChange={({ target: { value: email } }) => this.setState({ email })}
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <div>
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

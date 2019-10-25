import React, { Component } from 'react'
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

const browserHistory = createBrowserHistory()

class App extends Component {
  state = {
    token: localStorage.getItem('graphcool-auth-token'),
  }

  userDidSignIn = token => {
    this.setState({ token })
    localStorage.setItem('graphcool-auth-token', token)
  }

  logout = () => {
    localStorage.removeItem('graphcool-auth-token')
    this.setState({ token: null })
  }

  render() {
    const { token } = this.state
    const NotLoggedRoute = ({ component: Comp, ...params }) => (
      <Route
        {...params}
        render={props =>
          token ? (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          ) : (
            <Comp {...props} {...params} />
          )
        }
      />
    )
    const LoggedRoute = ({ component: Comp, ...params }) => (
      <Route
        {...params}
        render={props =>
          token ? (
            <Comp {...props} {...params} />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )

    return (
      <Router history={browserHistory}>
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">CRAP !</h1>
            <Link to="/" href="/">
              Home
            </Link>
            {token ? (
              <span>
                <Link to="/about" href="/about">
                  About
                </Link>
                <button onClick={this.logout}>Logout</button>
              </span>
            ) : (
              <span>
                <Link to="/signup" href="/signup">
                  Sign Up
                </Link>
                <Link to="/signin" href="/signin">
                  Sign in
                </Link>
              </span>
            )}
          </header>
          <div className="app-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <NotLoggedRoute exact path="/signup" component={SignUp} />
              <NotLoggedRoute
                exact
                path="/signin"
                component={SignIn}
                userDidSignIn={this.userDidSignIn}
              />
              <LoggedRoute exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App

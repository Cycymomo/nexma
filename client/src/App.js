import React, { Component } from 'react'
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

const browserHistory = createBrowserHistory()

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
  }

  userDidLogin = token => {
    this.setState({ token })
    localStorage.setItem('token', token)
  }

  logout = () => {
    localStorage.removeItem('token')
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
                pathname: '/login',
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
            <h1 className="app-title">CRAPrisma - Create React App with Prisma</h1>
            <Link to="/" href="/">
              Home
            </Link>
            {token ? (
              <span>
                <Link to="/profile" href="/profile">
                  Profile
                </Link>
                <button onClick={this.logout}>Logout</button>
              </span>
            ) : (
              <span>
                <Link to="/signup" href="/signup">
                  Sign Up
                </Link>
                <Link to="/login" href="/login">
                  Login
                </Link>
              </span>
            )}
          </header>
          <div className="app-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <NotLoggedRoute exact path="/signup" component={SignUp} userDidLogin={this.userDidLogin} />
              <NotLoggedRoute
                exact
                path="/login"
                component={Login}
                userDidLogin={this.userDidLogin}
              />
              <LoggedRoute exact path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App

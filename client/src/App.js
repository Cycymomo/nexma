import React, { Component } from 'react'
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Mutation } from 'react-apollo'

import logoutMutation from './apollo/mutations/logout'

import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Post from './pages/Post.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

const browserHistory = createBrowserHistory()

class App extends Component {
  state = {
    name: localStorage.getItem('name'),
  }

  userDidLogin = name => {
    this.setState({ name })
    localStorage.setItem('name', name)
  }

  logout = logout => {
    localStorage.removeItem('name')
    this.setState({ name: null })
    logout()
  }

  render() {
    const { name } = this.state
    const NotLoggedRoute = ({ component: Comp, ...params }) => (
      <Route
        {...params}
        render={props =>
          name ? (
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
          name ? (
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
            {
              name ? (
                <span>
                  <Link to="/profile" href="/profile">
                    Profile
                  </Link>
                  <Link to="/post" href="/post">
                    Add a post
                  </Link>
                  <Mutation mutation={logoutMutation}>
                    {logout => <button onClick={() => this.logout(logout)}>Logout { name }</button>}
                  </Mutation>
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
              )
            }
          </header>
          <div className="app-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <NotLoggedRoute exact path="/signup" component={SignUp} userDidLogin={this.userDidLogin} />
              <NotLoggedRoute exact path="/login" component={Login} userDidLogin={this.userDidLogin} />
              <LoggedRoute exact path="/profile" component={Profile} />
              <LoggedRoute exact path="/post" component={Post} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App

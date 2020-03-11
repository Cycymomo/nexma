import Link from 'next/link'
import Router from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks'

import logoutMutation from '../apollo/mutations/logout'
import meQuery from '../apollo/queries/me'

import css from "../styles/main.css"

export default function Nav() {
  const { data: { me } = {}, loading, refetch } = useQuery(meQuery)
  const [logout, { error }] = useMutation(logoutMutation, {
    onCompleted() {
      refetch()
      Router.push('/')
    }
  })

  return (
    <nav className={css.menu}>
      { error ? <p>Logout error: {JSON.stringify(error)}</p> : '' }
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {
          me ? (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/post">
                  <a>Add a post</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}>Logout { me.name }</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup">
                  <a>Sign Up</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  )
}

import Link from 'next-translate/Link'
import Router from 'next-translate/Router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import useTranslation from 'next-translate/useTranslation'

import ChangeLanguage from './ChangeLanguage'
import Error from './Error'

import logoutMutation from '../apollo/mutations/logout'
import meQuery from '../apollo/queries/me'

export default function Nav() {
  const { t, lang } = useTranslation()
  const { data: { me } = {}, loading, refetch } = useQuery(meQuery)
  const [logout, { error }] = useMutation(logoutMutation, {
    onCompleted() {
      refetch()
      Router.pushI18n('/')
      Router.reload()
    }
  })

  return (
    <nav className="menu">
      <Error type="logout" error={error ? JSON.stringify(error) : ''} />
      <ul>
        <li>
          <Link href="/">
            <a>{ t('common:menu-home') }</a>
          </Link>
        </li>
        {
          !loading && (
            me ? (
              <>
                <li>
                  <Link href="/profile">
                    <a>{ t('common:menu-profile') }</a>
                  </Link>
                </li>
                <li>
                  <Link href="/post">
                    <a>{ t('common:menu-add-post') }</a>
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>{ t('common:menu-logout', { name: me.name }) }</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signup">
                    <a>{ t('common:menu-signup') }</a>
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <a>{ t('common:menu-login') }</a>
                  </Link>
                </li>
              </>
            )
          )
        }
        <li>
          <ChangeLanguage />
        </li>
      </ul>
    </nav>
  )
}

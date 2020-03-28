import React from 'react'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import i18nConfig from '../i18n.json'

const { allLanguages } = i18nConfig

export default function ChangeLanguage() {
  const { t, lang } = useTranslation()

  return allLanguages.map(language => {
    if (language === lang) {
      return null
    }

    return (
      <Link href="/" lang={language} key={language}>
        <a>{t(`common:menu-language-name-${language}`)}</a>
      </Link>
    )
  })
}

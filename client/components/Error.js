import useTranslation from 'next-translate/useTranslation'

export default function Error({ type, error }) {
  const { t, lang } = useTranslation()

  return (
    error ? <p>{t('common:error', { type, error })}</p> : <></>
  )
}

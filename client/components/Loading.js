import useTranslation from 'next-translate/useTranslation'

export default function Loading() {
  const { t, lang } = useTranslation()

  return (
    <p>{t('common:loading')}</p>
  )
}

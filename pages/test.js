import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'

export default function Test() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('settings')))
  }, [])

  return (
    <>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
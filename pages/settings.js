import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSelector, useDispatch } from 'react-redux'
import { setUseLocalTimezone, setTimezone, setDateFormat, setTimeFormat } from '../store/settingsSlice'
import { listTimeZones } from 'timezone-support'
import { setTitle } from '/store/commonSlice'
import { useTranslation } from 'next-i18next'
import { formatDate } from '/helpers'

import { Autocomplete } from '@material-ui/lab'
import TextInput from '../components/TextInput'
import {
  Paper, Typography
} from '@material-ui/core'
import CheckBox from '/components/CheckBox'

function Timezone(props) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const settingsState = useSelector((state) => state.settings)

  let localTimezone
  try {
    localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch (e) { console.log('Get local timezone error: ' + e.message) }

  const handleBlur = () => {
    if (!settingsState.timezone) dispatch(setTimezone(localTimezone || null))
  }

  return (
    <Paper elevation={5} className="px-4 py-4">
      <Typography variant="h6">{t('timezone')}</Typography>
      <CheckBox
        checked={settingsState.useLocalTimezone}
        label={`${t('useLocalTimezone')}: ${localTimezone}`}
        onChange={(event) => dispatch(setUseLocalTimezone(event.target.checked))}
      />
      <Autocomplete
        autoHighlight
        disabled={settingsState.useLocalTimezone}
        options={listTimeZones()}
        getOptionLabel={(option) => option}
        value={settingsState.timezone}
        onChange={(event, newValue) => dispatch(setTimezone(newValue))}
        renderInput={(params) => <TextInput {...params} required label={t('orSelctTimezone')}/>}
        noOptionsText={t('noOptions')}
        onBlur={handleBlur}
      />
    </Paper>
  )
}

function Datetime(props) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const settingsState = useSelector((state) => state.settings)

  const dateFormatOptions = ['yyyy-MM-dd', 'yyyy/MM/dd', 'MM-dd-yyyy', 'MM/dd/yyyy']
  const timeFormatOptions = ['HH:mm', 'hh:mm a']

  return (
    <Paper elevation={5} className="px-4 py-4 mt-4">
      <Typography variant="h6">{t('dateTime')}</Typography>
      <Autocomplete
        autoHighlight
        options={dateFormatOptions}
        getOptionLabel={(option) => `${option} (e.g., ${formatDate(new Date(2021, 11, 31), option)})`}
        value={settingsState.dateFormat}
        onChange={(event, newValue) => dispatch(setDateFormat(newValue))}
        renderInput={(params) => <TextInput {...params} required label={t('dateFormat')}/>}
        noOptionsText={t('noOptions')}
      />
      <Autocomplete
        autoHighlight
        options={timeFormatOptions}
        getOptionLabel={(option) => `${option} (e.g., ${formatDate(new Date(2021, 11, 31, 18, 30), option)})`}
        value={settingsState.timeFormat}
        defaultValue="HH:mm"
        onChange={(event, newValue) => dispatch(setTimeFormat(newValue))}
        renderInput={(params) => <TextInput {...params} required label={t('timeFormat')}/>}
        noOptionsText={t('noOptions')}
      />
    </Paper>
  )
}

export default function Settings() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('settings')))
  }, [])

  return (
    <>
      <Timezone/>
      <Datetime/>
    </>
  ) 
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
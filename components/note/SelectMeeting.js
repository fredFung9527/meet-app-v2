import React from 'react'
import { useTranslation } from 'next-i18next'
import { dateFromUTC, formatDate } from '/helpers'
import { useSelector } from 'react-redux'
import { sampleMeeting } from '/data/sample-meeting'

import { 
  Dialog, AppBar, Toolbar, Typography, DialogContent
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextInput from '../TextInput'
import Link from 'next/link'

export default function SelectMeeting(props) {
  const settingsState = useSelector((state) => state.settings)
  const { t } = useTranslation(['note', 'common'])

  const [open, setOpen] = React.useState(true)
  const [options, setOptions] = React.useState([{
    ...sampleMeeting,
    dateTime: dateFromUTC(sampleMeeting.dateTime)
  }])

  const loadOptions = (event, input) => {
    if (event.type !== 'change') return
    if (!input) return
    // setOptions([{
    //   ...sampleMeeting,
    //   dateTime: dateFromUTC(sampleMeeting.dateTime)
    // }])
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">{t('note:selectMeeting')}</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className="mt-2">
        <Autocomplete
          autoHighlight
          options={options}
          value={null}
          getOptionLabel={(option) => 
            option.title + ` (${formatDate(option.dateTime, `${settingsState.dateFormat} ${settingsState.timeFormat}`)})`
          }
          onChange={(event, newValue) => {
            if (!newValue) return
            props.setMeeting(newValue)
            setOpen(false)
          }}
          onInputChange={loadOptions}
          renderInput={(params) => <TextInput {...params} placeholder={t('inputMeetingTitle')} hideHelperText/>}
          noOptionsText={t('noSuchMeeting')}
          disableClearable
        />

        <Link href="/new-meeting?from=new-note">
          <a>
            <Typography color="primary" align="center" className="mt-4 mb-2 underline">
              {t('common:or')} {t('common:newMeeting')}
            </Typography>
          </a>
        </Link>
      </DialogContent>
    </Dialog>
  )
}
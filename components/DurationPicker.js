import React from 'react'
import { useTranslation } from 'next-i18next'

import { 
  Grid, InputAdornment, IconButton
} from '@material-ui/core'
import TextInput from './TextInput'
import SimpleDialog from './SimpleDialog'

import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'

export default function DurationPicker(props) {
  const { t } = useTranslation('common')

  let valueText = ''
  const valueHours = Math.floor(props.value / 60)
  const valueMinutes = props.value % 60
  if (valueHours > 0) valueText += `${valueHours} ${t('hours')} `
  if (valueMinutes > 0) valueText += `${valueMinutes} ${t('minutes')}`

  const [open, setOpen] = React.useState(false)
  const [hours, setHours] = React.useState(valueHours || 0)
  const [minutes, setMinutes] = React.useState(valueMinutes || 0)

  const handleHourChange = (event) => {
    const valueNumber = +event.target.value
    setHours(valueNumber < 0 ? '0' : event.target.value)
  }

  const handleMinuteChange = (event) => {
    const valueNumber = +event.target.value
    if (valueNumber < 0) {
      setMinutes('0')
    } else if (valueNumber >= 60) {
      setHours(String(Number(hours) + Math.floor(valueNumber / 60)))
      setMinutes(String(valueNumber % 60))
    } else {
      setMinutes(event.target.value)
    }
  }

  const saveInput = () => {
    props.onChange && props.onChange(Number(hours) * 60 + Number(minutes))
  }

  return (
    <>
      <TextInput
        required={props.required}
        readOnly 
        label={props.label} 
        value={valueText} 
        onClick={() => setOpen(true)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <HourglassEmptyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <SimpleDialog 
        onClose={() => {saveInput();setOpen(false)}} 
        open={open} 
        title={t('duration')}
        content={
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput label={t('hours')} type="number" value={hours} onChange={handleHourChange}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label={t('minutes')} type="number" value={minutes} onChange={handleMinuteChange}/>
            </Grid>
          </Grid>
        }
        noConfirm
      />
    </>
  )
}
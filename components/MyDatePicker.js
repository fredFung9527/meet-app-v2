import DateFnsUtils from '@date-io/date-fns'
import { useSelector } from 'react-redux'
import { getTimeLocale } from '/helpers'

import { MuiPickersUtilsProvider, DatePicker, DateTimePicker } from '@material-ui/pickers'
import { IconButton, InputAdornment } from '@material-ui/core'

import EventIcon from '@material-ui/icons/Event'

export default function MyDatePicker(props) {
  const settingsState = useSelector((state) => state.settings)

  const isDatetimeMode = props.mode === 'date-time'
  const locale = getTimeLocale()

  const handleChange = (date) => {
    props.onChange && props.onChange(date)
  }

  return (
    <MuiPickersUtilsProvider locale={locale} utils={DateFnsUtils}>
      {
        isDatetimeMode ?
          (
            <DateTimePicker
              {...props}
              format={`${settingsState.dateFormat} ${settingsState.timeFormat}`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              helperText={props.helperText || ' '}
              variant="inline"
            />
          ) :
          (
            <DatePicker
              {...props}
              format={settingsState.dateFormat}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              helperText={props.helperText || ' '}
              variant="inline"
            />
          )
      }
    </MuiPickersUtilsProvider>
  )
}
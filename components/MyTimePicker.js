import DateFnsUtils from '@date-io/date-fns'
import { useSelector } from 'react-redux'

import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'

export default function MyTimePicker(props) {
  const settingsState = useSelector((state) => state.settings)

  const handleChange = (date) => {
    props.onChange && props.onChange(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {
        <TimePicker
          {...props}
          format={settingsState.timeFormat}
          onChange={handleChange}
          variant="inline"
        />
      }
    </MuiPickersUtilsProvider>
  )
}
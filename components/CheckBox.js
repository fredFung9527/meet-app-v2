import { FormControlLabel, Checkbox } from '@material-ui/core'

export default function CheckBox(props) {
  return (
    <FormControlLabel
      control={<Checkbox {...props} color="primary"/>}
      label={props.label}
    />
  )
}
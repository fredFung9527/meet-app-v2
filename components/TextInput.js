import { omit } from 'lodash'

import { TextField } from '@material-ui/core'

export default function TextInput(props) {
  const finalProps = omit(props, 'hideHelperText')

  return (
    <TextField
      {...finalProps}
      fullWidth
      helperText={props.hideHelperText ? '' : (props.helperText || ' ')}
    />
  )
}
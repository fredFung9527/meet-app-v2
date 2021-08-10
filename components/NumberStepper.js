import IconButton from './IconButton'
import { Grid } from '@material-ui/core'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'

export default function NumberStepper(props) {
  const handleChange = (v) => {
    let value = +v
    if (props.notNegative && value < 0) {
      value = 0
    }
    props.onChange(value)
  }

  return (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton color="primary" onClick={() => handleChange(props.value + 1)}>
          <AddCircleOutlineIcon color="primary" fontSize="large"/>
        </IconButton>
      </Grid>
      <Grid item>
        <span>{props.name ? props.name + ' * ' : ''}</span>
        <span className="MuiTypography-h6 underline">{props.value || 0}</span>
      </Grid>
      <Grid item>
        <IconButton color="secondary" onClick={() => handleChange(props.value - 1)} disabled={props.notNegative && props.value <=0}>
          <RemoveCircleOutlineIcon fontSize="large"/>
        </IconButton>
      </Grid>
    </Grid>
  )
}
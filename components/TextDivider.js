import { Divider, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

export default function TextDivider(props) {
  const theme = useTheme()

  return (
    <Grid container alignItems="center">
      <Grid item xs>
        <Divider variant="middle"/>
      </Grid>
      <Grid item style={{color: theme.palette.greyColor.main}}>
        { props.text || '-' }
      </Grid>
      <Grid item xs>
        <Divider variant="middle"/>
      </Grid>
    </Grid>
  )
}
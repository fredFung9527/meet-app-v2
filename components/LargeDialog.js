import { useMediaQuery } from '@material-ui/core'

import { 
  Dialog, AppBar, Toolbar, Typography, DialogContent, DialogActions, Grid
} from '@material-ui/core'
import IconButton from './IconButton'

import CloseIcon from '@material-ui/icons/Close'

export default function LargeDialog(props) {
  const isXsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'))

  return (
    <Dialog {...props} fullWidth maxWidth="md" fullScreen={isXsScreen}>
      {props.title && 
        <AppBar position="relative">
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Typography variant="h6">{props.title}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={props.onClose} color="inherit"><CloseIcon/></IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      }
      <DialogContent className="pt-2">
        { props.children || '-' }
      </DialogContent>
      {props.actions && <DialogActions>{props.actions}</DialogActions>}
    </Dialog>
  )
}
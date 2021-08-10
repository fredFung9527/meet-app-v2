import { useTranslation } from 'next-i18next'
import { omit } from 'lodash'

import { 
  Dialog, AppBar, Toolbar, Typography, DialogContent, DialogActions, Grid
} from '@material-ui/core'
import TextButton from '/components/TextButton'
import IconButton from './IconButton'

import CloseIcon from '@material-ui/icons/Close'

export default function SimpleDialog(props) {
  const { t } = useTranslation('common')

  const dialogProps = omit(props, ['noConfirm', 'onConfirm', 'warning'])

  return (
    <Dialog {...dialogProps} fullWidth maxWidth="sm">
      <AppBar position="relative" color={props.warning ? 'secondary' : 'primary'}>
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
      <DialogContent className="mt-2">
        { props.content || '-' }
      </DialogContent>
      {!props.noConfirm && 
        <DialogActions>
          <TextButton onClick={props.onConfirm} color={props.warning ? 'secondary' : 'primary'}>
            {t('confirm')}
          </TextButton>
        </DialogActions>
      }
    </Dialog>
  )
}
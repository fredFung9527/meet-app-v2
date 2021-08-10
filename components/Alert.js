import { useSelector, useDispatch } from 'react-redux'
import { closeAlert } from '/store/commonSlice'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

export default function Alert(props) {
  const common = useSelector((state) => state.common)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    dispatch(closeAlert())
  }

  return (
    <Snackbar 
      open={common.alert} onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      style={{marginTop: 50}}
    >
      <MuiAlert elevation={5} variant="filled" onClose={handleClose} severity={common.alertType || 'error'}>
        {common.alertMessage || '-'}
      </MuiAlert>
    </Snackbar>
  )
}
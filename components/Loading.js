import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function Loading(props) {
  const classes = useStyles()
  const loading = useSelector((state) => state.common.loading)

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  )
}
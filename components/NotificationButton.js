import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { setList } from '/store/notificationSlice'
import { useRouter } from 'next/router'

import {
  Badge, Backdrop, Container
} from '@material-ui/core'
import IconButton from './IconButton'
import NotificationPage from '/pages/notifications'

import NotificationsIcon from '@material-ui/icons/Notifications'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function NotificationButton(props) {
  const notifications = useSelector((state) => state.notification.list)
  const dispatch = useDispatch()
  const router = useRouter()

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  React.useEffect(async() => {
    const loadNotifications = async () => {
      const result = (await import('/data')).fakeNotifications
      dispatch(setList(result))
      if (result.length && router.pathname !== '/notifications') setOpen(true)
    }
    await loadNotifications()
  }, [])

  React.useEffect(() => {
    if (!notifications.length) setOpen(false)
  }, [notifications])

  return (
    <>
      <IconButton color="inherit" to="/notifications">
        <Badge badgeContent={notifications.length} invisible={!notifications.length} color="secondary" max={9}>
          <NotificationsIcon/>
        </Badge>
      </IconButton>
      <Backdrop className={classes.backdrop} open={open}>
        <Container maxWidth="md">
          <NotificationPage/>
        </Container>
      </Backdrop>
    </>
  )
}
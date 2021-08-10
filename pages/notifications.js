import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { setList } from '/store/notificationSlice'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import classNames from 'clsx'
import { formatDateTZ, getFromNow } from '/helpers'

import { Paper, Grid, Typography, DialogActions, NoSsr } from '@material-ui/core'
import IconButton from '/components/IconButton'

import ErrorIcon from '@material-ui/icons/Error'
import EventIcon from '@material-ui/icons/Event'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  dateText: {
    color: theme.palette.greyColor.main
  }
}))

function NotificationCard(props) {
  const theme = useTheme()
  const settingsState = useSelector((state) => state.settings)
  const classes = useStyles()

  const item = props.item || {}
  const iconSize = {
    width: 50,
    height: 50
  }

  const shownDate = getFromNow(item.date)
  const isXsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'))

  return (
    <Paper elevation={5}>
      <div 
        style={{
          backgroundColor: item.type === 'error' ? theme.palette.secondary.main : theme.palette.primary.main,
          height: 10,
          borderRadius: '4px 4px 0 0'
        }}
      />
      <Grid container alignItems="center" spacing={2} className={`px-4 ${isXsScreen ? 'mt-4' : 'py-4'}`}>
        <Grid item>
          {item.type === 'error' ? <ErrorIcon style={iconSize} color="secondary"/> : <EventIcon style={iconSize} color="primary"/>}
        </Grid>
        <Grid item xs>
          <Typography variant="h6">{item.title}</Typography>
          <div>{item.message}</div>
          <div className={classNames(classes.dateText, 'mt-1')}>{formatDateTZ(item.date, `${settingsState.dateFormat} ${settingsState.timeFormat}`)}</div>
        </Grid>
        {!isXsScreen && <Grid item style={{textAlign: 'end'}}>
            <div className={classes.dateText}>{shownDate}</div>
            <IconButton 
              color={item.type === 'error' ? 'secondary' : 'primary'} 
              onClick={props.onRemove}
            >
              <CloseIcon/>
            </IconButton>
          </Grid>
        }
      </Grid>
      {isXsScreen && <DialogActions>
        <div className={classes.dateText}>{shownDate}</div>
        <IconButton 
          color={item.type === 'error' ? 'secondary' : 'primary'}
          onClick={props.onRemove}
        >
          <CloseIcon/>
        </IconButton>
      </DialogActions>}
    </Paper>
  )
}

export default function Notifications() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notification.list)

  const removeNotification = (idx) => {
    const newList = [...notifications.slice(0, idx), ...notifications.slice(idx+1)]
    dispatch(setList(newList))
  }

  React.useEffect(() => {
    dispatch(setTitle(t('notifications')))
  }, [])

  return (
    <NoSsr>
      <Grid container spacing={2}>
        {notifications.map((item, idx) =>
          <Grid item key={'notifications'+idx} xs={12} className={classNames({'mt-2': idx != 0})}>
            <NotificationCard 
              item={item}
              onRemove={() => removeNotification(idx)}
            />
          </Grid>
        )}
      </Grid>
    </NoSsr>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
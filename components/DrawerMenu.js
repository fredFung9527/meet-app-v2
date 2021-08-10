import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { some } from 'lodash'
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles'

import {
  Typography, List, ListItem, ListItemIcon, ListItemText, 
  Grid, Drawer, Divider,Avatar, Collapse 
} from '@material-ui/core'
import IconButton from '../components/IconButton'
import LanguageSwitch from '../components/LanguageSwitch'
import Link from 'next/link'

import SettingsIcon from '@material-ui/icons/Settings'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import DateRangeIcon from '@material-ui/icons/DateRange'
import AddIcon from '@material-ui/icons/Add'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import BusinessIcon from '@material-ui/icons/Business'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import RateReviewIcon from '@material-ui/icons/RateReview'
import NoteIcon from '@material-ui/icons/Note'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

const PrimaryListItem = withStyles((theme) => ({
  selected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: 'white !important'
  },
}))(ListItem)

const useStyles = makeStyles((theme) => ({
  activeIcon: {
    color: 'white',
  },
}))

export default function DrawerMenu(props) {
  const classes = useStyles()
  const userSlice = useSelector((state) => state.user)
  const userSessionSlice = useSelector((state) => state.userSession)
  const user = userSlice.rememberMe ? userSlice.user : userSessionSlice.user

  const router = useRouter()
  const { t } = useTranslation('common')
  const theme = useTheme()

  const closeDrawer = () => props.setOpen(false)
  const handleClose = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
    closeDrawer()
  }

  const menus = [
    {
      text: t('home'),
      icon: <HomeIcon/>,
      href: '/'
    },
    {
      text: t('summary'),
      icon: <EqualizerIcon/>,
      items: [
        {
          text: t('byCompany'),
          icon: <BusinessIcon/>,
          href: '/summary/company'
        },
        {
          text: t('other'),
          icon: <MoreHorizIcon/>,
          href: '/summary'
        },
      ]
    },
    {
      text: t('meetings'),
      icon: <DateRangeIcon/>,
      items: [
        {
          text: t('newMeeting'),
          icon: <AddIcon/>,
          href: '/new-meeting'
        },
        {
          text: t('schedule'),
          icon: <DateRangeIcon/>,
          href: '/schedule'
        },
      ]
    },
    {
      text: t('notes'),
      icon: <NoteIcon/>,
      items: [
        {
          text: t('newNote'),
          icon: <RateReviewIcon/>,
          href: '/new-note'
        },
        {
          text: t('myNotes'),
          icon: <NoteIcon/>,
          href: '/my-notes'
        },
        {
          text: t('notes'),
          icon: <NoteIcon/>,
          href: '/notes'
        },
      ]
    },
    {
      text: t('notifications'),
      icon: <NotificationsIcon/>,
      href: '/notifications'
    },
    {
      text: t('settings'),
      icon: <SettingsIcon/>,
      href: '/settings'
    },
    {
      text: t('account'),
      icon: <AccountCircleIcon/>,
      href: '/account'
    },
    {
      text: t('tutorials'),
      icon: <HelpOutlineIcon/>,
      href: '/tutorials'
    },
    {
      text: t('logout'),
      icon: <ExitToAppIcon/>,
      href: '/login'
    }
  ]

  const MyListItem = (props) => {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      if (props.items && some(props.items, item => router.pathname.startsWith(item.href))) setOpen(true)
    }, [])

    return (
      props.items ?
        (
          <>
            <ListItem button onClick={() => setOpen(!open)}>
              <ListItemIcon color="inherit">{props.icon}</ListItemIcon>
              <ListItemText primary={props.text} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List>
                {props.items.map(item => 
                  <Link key={'subMenu' + item.href} href={item.href}>
                    <a>
                      <PrimaryListItem button selected={router.pathname===item.href} onClick={closeDrawer}>
                        <ListItemText primary={item.text} />
                        <ListItemIcon style={{minWidth: 24}} className={router.pathname===item.href ? classes.activeIcon : null}>{item.icon}</ListItemIcon>
                      </PrimaryListItem>
                    </a>
                  </Link>
                )}
              </List>
            </Collapse>
          </>
        ) : 
        (
          <Link href={props.href}>
            <a>
              <PrimaryListItem button selected={router.pathname===props.href} onClick={closeDrawer}>
                <ListItemIcon className={router.pathname===props.href ? classes.activeIcon : null}>
                  {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.text} />
              </PrimaryListItem>
            </a>
          </Link>
        )
    )
  }

  return (
    <Drawer open={props.open} onClose={handleClose}>
      <div style={{width: 250}}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs>
            <Grid 
              container alignItems="center" 
              style={{backgroundColor: theme.palette.greyColor.light, borderRadius: '0 5px 5px 0'}}
              className="px-2 py-2 my-2"
            >
              <Avatar style={{backgroundColor: theme.palette.primary.main}}>
                {user.firstName && user.firstName[0] || '-'}
              </Avatar>
              <div className="ml-2">
                <Typography noWrap style={{overflow: "hidden", textOverflow: "ellipsis", width: '80px'}} className="bold">
                  {`${user.firstName}, ${user.lastName}`}
                </Typography>
                <span style={{color: theme.palette.greyColor.dark, fontSize: 12}}>{user.title}</span>
              </div>
            </Grid> 
          </Grid>
          <IconButton color="inherit" onClick={closeDrawer} className="mx-1">
            <ChevronLeftIcon/>
          </IconButton>
        </Grid>
        <Divider/>

        <List>
          {menus.map(item => <MyListItem key={'menu' + item.href} {...item}/>)}
        </List>

        <Grid container justifyContent="center">
          <LanguageSwitch/>
        </Grid>
      </div>
    </Drawer>
  )
}
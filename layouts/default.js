import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Head from 'next/head'
import {
  AppBar, Toolbar, Typography, useScrollTrigger,
  Container, Fab, Zoom, Grid, NoSsr, Hidden, 
} from '@material-ui/core'
import IconButton from '../components/IconButton'
import TextButton from '../components/TextButton'
import LanguageSwitch from '../components/LanguageSwitch'
import Loading from '/components/Loading'
import DrawerMenu from '../components/DrawerMenu'
import NotificationButton from '/components/NotificationButton'

import SettingsIcon from '@material-ui/icons/Settings'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import MenuIcon from '@material-ui/icons/Menu'
import Alert from '/components/Alert'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'

function ScrollTop({ window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 50,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <Fab
        size="medium"
        color="secondary"
        onClick={handleClick} 
        style={{position: 'fixed', bottom: '70px', right: '15px'}}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}

export default function Default(props) {
  const router = useRouter()
  const { t } = useTranslation('common')

  const pageTitle = useSelector((state) => state.common.title)
  const userSlice = useSelector((state) => state.user)
  const userSessionSlice = useSelector((state) => state.userSession)

  const [drawer, setDrawer] = React.useState(false)

  React.useEffect(() => {
    const user = userSlice.rememberMe ? userSlice.user : userSessionSlice.user
    if (!user || !user.email) {
      router.replace(`/login?from=${router.pathname}`)
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>{pageTitle} - MeetApp</title>
      </Head>
      <Alert/>
      <Loading/>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawer(true)}>
            <MenuIcon/>
          </IconButton>
          <NoSsr>
            <Typography noWrap variant="h6" style={{marginLeft: 8, width: 300}}>{pageTitle}</Typography>
          </NoSsr>
          <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
            <IconButton color="inherit" to="/">
              <HomeIcon/>
            </IconButton>
            <NotificationButton/>
            <IconButton color="inherit" to="/account">
              <AccountCircleIcon/>
            </IconButton>
            <Hidden only="xs">
              <LanguageSwitch/>
              <IconButton color="inherit" to="/settings">
                <SettingsIcon/>
              </IconButton>
              <TextButton color="inherit" to="/login">{t('logout')}</TextButton>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
      <NoSsr>
        <DrawerMenu open={drawer} setOpen={setDrawer}/>
      </NoSsr>
      <Toolbar id="back-to-top-anchor"/>
      <Container className="px-2 py-2">
        { props.children }
      </Container>
      <ScrollTop {...props}/>
    </>
  )
}
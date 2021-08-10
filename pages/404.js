import { useMediaQuery } from '@material-ui/core'

import { Typography, Grid, Divider } from "@material-ui/core"
import Image from 'next/image'
import BoxButton from '/components/BoxButton'

export default function Custom404() {
  const isXsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'))

  return (
    <div style={{height: 'calc(100vh - 84px)'}}>
      <Grid container justifyContent="center" alignItems="center" className="full-height" direction="column">
        <Image src="/images/icons/error-404.png" width={250} height={250}/>
        <Grid container justifyContent="center" alignItems="center" className="my-4">
          <Typography variant="h2" align="right">404</Typography>
          <Divider orientation="vertical" variant="middle"/>
          <Typography variant="h4" style={{maxWidth: isXsScreen ? 200 : null}}>You are beyond the borders</Typography>
        </Grid>
        <div>
          <BoxButton to="/" size="large">Back To Home</BoxButton>
        </div>
      </Grid>
    </div>
  )
}
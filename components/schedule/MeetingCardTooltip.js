import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { formatDate } from '/helpers'

import {
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui'
import {
  Grid, Typography, DialogActions
} from '@material-ui/core'
import TextButton from '/components/TextButton'
import EditMeetingButton from '/components/meeting/EditMeetingButton'

import ScheduleIcon from '@material-ui/icons/Schedule'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import RateReviewIcon from '@material-ui/icons/RateReview'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

export default function MeetingCardTooltip(props) {
  const { t } = useTranslation('common')
  const settingsState = useSelector((state) => state.settings)
  
  const [visible, setVisible] = React.useState(false)

  const Tooltip = ({ children, appointmentData, appointmentResources, classes, ...restProps }) => {
    return (
      <div style={{marginLeft: 12}}>
        <Grid container alignItems="center">
          <Grid item style={{marginRight: 12}}>
            <div style={{width: 35, height: 35, borderRadius: 35, backgroundColor: appointmentResources[0] && appointmentResources[0].color}}/>
          </Grid>
          <Grid item>
            <Typography variant="h6">{appointmentData.title}</Typography>
            {formatDate(appointmentData.startDate, 'MMMM d, yyyy')}
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2} className="mt-2">
          <Grid item xs={2} container justifyContent="center">
            <ScheduleIcon/>
          </Grid>
          <Grid item xs={10}>
            {`${formatDate(appointmentData.startDate, settingsState.timeFormat)} - ${formatDate(appointmentData.endDate, settingsState.timeFormat)}`}
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2} container justifyContent="center">
            <LocalOfferOutlinedIcon/>
          </Grid>
          <Grid item xs={10}>
            {t(appointmentData.status)}
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2} container justifyContent="center">
            <LabelOutlinedIcon/>
          </Grid>
          <Grid item xs={10}>
            {t(appointmentData.meetingType)}
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2} container justifyContent="center">
            <InfoOutlinedIcon/>
          </Grid>
          <Grid item xs={10}>
            {`${t('createdBy')}: Fred Fung`}<br/>{`${t('role')}: ${t('asCreater')}`}
          </Grid>
        </Grid>

        <DialogActions className="full-width">
          {appointmentData.status === 'pending' && <TextButton><DoneAllIcon className="mr-1"/>{t('confirm')}</TextButton>}
          <EditMeetingButton meeting={appointmentData}/>
          {['no-note', 'approved', 'finish'].indexOf(appointmentData.status) >= 0 && 
            <TextButton color="primary"><RateReviewIcon className="mr-1"/>{t('note')}</TextButton>
          }
        </DialogActions>
      </div>
    )
  }

  return (
    <AppointmentTooltip contentComponent={Tooltip} visible={visible} onVisibilityChange={setVisible}/>
  )
}
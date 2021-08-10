import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { formatDate, dateFromUTC } from '/helpers'
import { addMinutes } from 'date-fns'
import { alertError, setMeetingOfCurrentNote } from '/store/commonSlice'

import {
  Typography, Grid
} from '@material-ui/core'
import InternalUserPicker from '../InternalUserPicker'
import OtherParticipantInput from '../OtherParticipantInput'

import ScheduleIcon from '@material-ui/icons/Schedule'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import BusinessIcon from '@material-ui/icons/Business'

export default function NoteMeeting(props) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const settingsState = useSelector((state) => state.settings)

  const meetingOfCurrentNote = useSelector((state) => state.common.meetingOfCurrentNote)
  if (!meetingOfCurrentNote || !meetingOfCurrentNote._id) return <div/>
  const meeting = { ...meetingOfCurrentNote, dateTime: dateFromUTC(meetingOfCurrentNote.dateTime)}
  const setMeeting = (v) => dispatch(setMeetingOfCurrentNote(v))

  const handleInternalParticipantInput = (value) => {
    if (meeting.meetingType === 'internal' && (!value || !value.length)) {
      dispatch(alertError(t('meeting:needInternalParticipants')))
      return
    }
    setMeeting({
      ...meeting,
      internalParticipants: value
    })
  }

  const handleOtherParticipantInput = (value) => {
    if (['showcase-or', 'showcase-virtual', 'customerVisit'].includes(meeting.meetingType) && (!value || !value.length)) {
      dispatch(alertError(t('meeting:needOtherParticipants')))
      return
    }
    setMeeting({
      ...meeting,
      otherParticipants: value
    })
  }

  return (
    <div className="mx-2">
      <Typography variant="h6" className="mt-3">{meeting.title}</Typography>
      <div className="ml-2">
        <Grid container alignItems="center" spacing={2} className="mt-1">
          <Grid item>
            <ScheduleIcon color="primary"/>
          </Grid>
          <Grid item xs>
            {formatDate(meeting.dateTime, 'MMMM d, yyyy')} {`${formatDate(meeting.dateTime, settingsState.timeFormat)} - ${formatDate(addMinutes(meeting.dateTime, meeting.durationMinutes), settingsState.timeFormat)}`}
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2} className="mt-1">
          <Grid item>
            <LocalOfferOutlinedIcon color="primary"/>
          </Grid>
          <Grid item xs>
            {t(meeting.status)}
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2} className="mt-1">
          <Grid item>
            <LabelOutlinedIcon color="primary"/>
          </Grid>
          <Grid item xs>
            {t(meeting.meetingType)} {meeting.showcaseYear ? ` - ${meeting.showcaseYear}` : ''} {meeting.showcaseSeason}
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2} className="mt-1">
          <Grid item>
            <BusinessIcon color="primary"/>
          </Grid>
          <Grid item xs>
            Comapny A
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2} className="mt-1">
          <Grid item>
            <InfoOutlinedIcon color="primary"/>
          </Grid>
          <Grid item xs>
            {`${t('createdBy')}: Fred Fung`}
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2} alignItems="center" className="mt-2">
        <Grid item xs={12}>
          <InternalUserPicker
            label={t('meeting:internalParticipants')}
            value={meeting.internalParticipants} 
            onChange={handleInternalParticipantInput}
            required={meeting.meetingType === 'internal'}
          />
        </Grid>
        {meeting.meetingType !== 'internal' && <Grid item xs={12}>
          <OtherParticipantInput
            label={t('meeting:otherParticipants')}
            value={meeting.otherParticipants}
            onChange={handleOtherParticipantInput}
            required={['showcase-or', 'showcase-virtual', 'customerVisit'].includes(meeting.meetingType)}
          />
        </Grid>}
      </Grid>
    </div>
  )
}
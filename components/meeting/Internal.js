import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { capitalizeFirstLetter } from '/helpers'
import { some } from 'lodash'

import { 
  MeetingDatetime, MeetingDuration, MeetingRemarks, MeetingOnlineMeetingLink, MeetingLocation, MeetingTopic, 
  MeetingShowcaseYear, MeetingShowcaseSeason, MeetingMarkrtCodeOrCompanyName,
  MeetingInternalParticipants, MeetingStatus
} from './Input'
import {
  Paper, Typography, Grid
} from '@material-ui/core'

export default function NewMeetingShowcaseInternal(props) {
  const { t } = useTranslation(['common', 'meeting'])
  const meetingSlice = useSelector((state) => state.meeting)

  const [errors, setErrors] = React.useState({})
  const [helperTexts, setHelperTexts] = React.useState({})

  React.useEffect(() => {
    if (!meetingSlice) return
    const checkList = ['dateTime', 'internalParticipants']
    let newErrors = {}
    let newHelperTexts = {}
    checkList.forEach(key => {
      if (!meetingSlice[key] || meetingSlice[key].length == 0) {
        newErrors[key] = true
        newHelperTexts[key] = t(`meeting:need${capitalizeFirstLetter(key)}`)
      }
    })
    setErrors(newErrors)
    setHelperTexts(newHelperTexts)
    props.setEnoughInformation(!some(newErrors, (value, key) => value))
  }, [meetingSlice])

  return (
    <>
      <Typography variant="h6" className="mb-1">{t('required')}</Typography>
      <Paper elevation={5} className="px-4 py-4">
        <Grid container spacing={2} alignContent="center">
          <Grid item xs={12} md={6}>
            <MeetingDatetime
              required
              error={props.showError && errors['dateTime']} 
              helperText={props.showError && errors['dateTime'] && helperTexts['dateTime']}
            />
          </Grid>
          <Grid item xs={12}>
            <MeetingInternalParticipants
              required
              error={props.showError && errors['internalParticipants']} 
              helperText={props.showError && errors['internalParticipants'] && helperTexts['internalParticipants']}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MeetingDuration required/>
          </Grid>
          <Grid item xs={12} md={6}>
            <MeetingStatus required/>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h6" className="mb-1 mt-2">{t('optional')}</Typography>
      <Paper elevation={5} className="px-4 py-4">
        <Grid container spacing={2} alignContent="center">
          <Grid item xs={12} md={6}>
            <MeetingMarkrtCodeOrCompanyName/>
          </Grid>
          <Grid item xs={6} md={3}>
            <MeetingShowcaseYear optional/>
          </Grid>
          <Grid item xs={6} md={3}>
            <MeetingShowcaseSeason optional/>
          </Grid>
          <Grid item xs={12} md={6}>
            <MeetingTopic/>
          </Grid>
          <Grid item xs={12} md={6}>
            <MeetingLocation/>
          </Grid>
          <Grid item xs={12} md={6}>
            <MeetingOnlineMeetingLink/>
          </Grid>
          <Grid item xs={12}>
            <MeetingRemarks/>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
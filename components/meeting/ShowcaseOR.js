import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { capitalizeFirstLetter } from '/helpers'
import { some } from 'lodash'

import { 
  MeetingDatetime, MeetingDuration, MeetingRemarks, MeetingLocation, MeetingTopic,
  MeetingShowcaseYear, MeetingShowcaseSeason, MeetingMarkrtCodeOrCompanyName,
  MeetingInternalParticipants, MeetingOthersParticipants, MeetingStatus
} from './Input'
import {
  Paper, Typography, Grid
} from '@material-ui/core'

export default function NewMeetingShowcaseOR(props) {
  const { t } = useTranslation(['common', 'meeting'])
  const meetingSlice = useSelector((state) => state.meeting)

  const [errors, setErrors] = React.useState({})
  const [helperTexts, setHelperTexts] = React.useState({})

  React.useEffect(() => {
    if (!meetingSlice) return
    const checkList = ['dateTime', 'marketCodeOrCompanyName', 'otherParticipants']
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
          <Grid item xs={12} md={6}>
            <MeetingMarkrtCodeOrCompanyName
              required
              error={props.showError && errors['marketCodeOrCompanyName']} 
              helperText={props.showError && errors['marketCodeOrCompanyName'] && helperTexts['marketCodeOrCompanyName']}
            />
          </Grid>
          <Grid item xs={12}>
            <MeetingOthersParticipants
              required
              error={props.showError && errors['otherParticipants']}
              helperText={props.showError && errors['otherParticipants'] && helperTexts['otherParticipants']}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MeetingDuration required/>
          </Grid>
          <Grid item xs={6} md={3}>
            <MeetingShowcaseYear required/>
          </Grid>
          <Grid item xs={6} md={3}>
            <MeetingShowcaseSeason required/>
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
            <MeetingTopic/>
          </Grid>
          <Grid item xs={12} md={6}>
            <MeetingLocation/>
          </Grid>
          <Grid item xs={12}>
            <MeetingInternalParticipants/>
          </Grid>
          <Grid item xs={12}>
            <MeetingRemarks/>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
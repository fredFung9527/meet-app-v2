import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { 
  setStatus, setDateTime, setDurationMinutes, setTopic, 
  setRemarks, setLocation, setOnlineMeetingLink,
  setShowcaseYear, setShowcaseSeason, setMarketCodeOrCompanyName,
  addInternalParticipants, setInternalParticipants, setOtherParticipants
} from '/store/meetingSlice'
import { internalParticipants, meetingStatuseColors } from '/data/meeting-settings'
import { find, concat, keys } from 'lodash'

import CheckBox from '../CheckBox'
import MyDatePicker from '/components/MyDatePicker'
import DurationPicker from '../DurationPicker'
import TextInput from '../TextInput'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SimpleDialog from '../SimpleDialog'
import InternalUserPicker from '../InternalUserPicker'
import MarketCodePicker from '../MarketCodePicker'
import OtherParticipantInput from '../OtherParticipantInput'
import ShowcaseYearPicker from '../ShowcaseYearPicker'
import ShowcaseSeasonPicker from '../ShowcaseSeasonPicker'

export function MeetingStatus(props) {
  const { t } = useTranslation(['common', 'meeting'])
  const dispatch = useDispatch()

  const value = useSelector((state) => state.meeting.status)
  const statuses = keys(meetingStatuseColors)

  const handleChange = (v) => {
    dispatch(setStatus(v))
  }

  React.useEffect(() => {
    if(!value) handleChange(statuses[0])
  }, [])

  return (
    <Autocomplete
      autoHighlight
      options={statuses}
      getOptionLabel={(option) => t(option)}
      value={value}
      onChange={(event, newValue) => handleChange(newValue)}
      renderInput={(params) => <TextInput {...params} {...props} label={t('status')}/>}
      noOptionsText={t('meeting:noOptions')}
      disableClearable
    />
  )
}

export function MeetingDatetime(props) {
  const { t } = useTranslation('meeting')
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.dateTime)

  return (
    <MyDatePicker
      {...props}
      mode="date-time"
      fullWidth 
      label={t('meetingDatetime')}
      value={value}
      onChange={(newDateTime) => dispatch(setDateTime(newDateTime))}
    />
  )
}

export function MeetingDuration(props) {
  const { t } = useTranslation('meeting')
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.durationMinutes)

  return (
    <DurationPicker
      {...props}
      fullWidth
      label={`${t('duration')} (${t('durationHint')})`}
      value={value}
      onChange={(v) => dispatch(setDurationMinutes(v))}
    />
  )
}

export function MeetingTopic(props) {
  const { t } = useTranslation('meeting')
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.topic)

  return (
    <TextInput
      {...props}
      label={t('topic')}
      value={value}
      onChange={(event) => dispatch(setTopic(event.target.value))}
    />
  )
}

export function MeetingRemarks(props) {
  const { t } = useTranslation('meeting')
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.remarks)

  return (
    <TextInput
      {...props}
      label={t('remarks')}
      value={value}
      onChange={(event) => dispatch(setRemarks(event.target.value))}
    />
  )
}

export function MeetingLocation(props) {
  const { t } = useTranslation('meeting')
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.location)

  return (
    <TextInput
      {...props}
      fullWidth
      label={t('location')}
      value={value}
      onChange={(event) => dispatch(setLocation(event.target.value))}
    />
  )
}

export function MeetingOnlineMeetingLink(props) {
  const { t } = useTranslation('meeting')
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.onlineMeetingLink)

  return (
    <TextInput
      {...props}
      label={t('onlineMeetingLink')}
      value={value}
      onChange={(event) => dispatch(setOnlineMeetingLink(event.target.value))}
    />
  )
}

export function MeetingShowcaseYear(props) {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.showcaseYear)
  const handleChange = (v) => {
    dispatch(setShowcaseYear(v))
  }

  return (
    <ShowcaseYearPicker
      {...props}
      value={value}
      onChange={handleChange}
    />
  )
}

export function MeetingShowcaseSeason(props) {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.showcaseSeason)
  const handleChange = (v) => {
    dispatch(setShowcaseSeason(v))
  }

  return (
    <ShowcaseSeasonPicker
      {...props}
      value={value}
      onChange={handleChange}
    />
  )
}

export function MeetingMarkrtCodeOrCompanyName(props) {
  const { t } = useTranslation('meeting')
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.marketCodeOrCompanyName)

  const [open, setOpen] = React.useState(false)
  const [suggestedInternalParticipants, setSuggestedInternalParticipants] = React.useState([])
  const [selectedInternalParticipants, setSelectedInternalParticipants] = React.useState({})

  const trySlectSuggestedInternalParticipants = (item) => {
    if (!item) {
      dispatch(setInternalParticipants([]))
      return
    }
    if (item.isNewCompany) return
    let participantlist = []
    let selected = {}
    const relatedInternalParticipants = concat(item.managers, item.developers, item.assistants, item.advisors) || []
    if (!relatedInternalParticipants.length) return
    relatedInternalParticipants.forEach(userID => {
      if (userID) {
        const theParticipant = find(internalParticipants, it => it.userID === userID)
        if (theParticipant) {
          participantlist.push(theParticipant)
          selected[userID] = true
        }
      }
    })
    if (!participantlist.length) return
    setSelectedInternalParticipants(selected)
    setSuggestedInternalParticipants(participantlist)
    setOpen(true)
  }

  const handleSelectParticipants = (event) => {
    setSelectedInternalParticipants({ ...selectedInternalParticipants, [event.target.name]: event.target.checked });
  }

  const handleConfirmSelection = () => {
    dispatch(addInternalParticipants(
      suggestedInternalParticipants.filter(it => selectedInternalParticipants[it.userID])
    ))
    setOpen(false)
  }

  return (
    <>
      <MarketCodePicker
        value={value}
        onChange={newValue => {
          if (typeof newValue === 'string') {
            dispatch(setMarketCodeOrCompanyName({
              marketCode: newValue,
              isNewCompany: true
            }))
            trySlectSuggestedInternalParticipants(null)
          } else if (newValue && newValue.inputValue) {
            dispatch(setMarketCodeOrCompanyName({
              marketCode: newValue.inputValue,
              isNewCompany: true
            }))
            trySlectSuggestedInternalParticipants(null)
          } else {
            dispatch(setMarketCodeOrCompanyName((newValue)))
            trySlectSuggestedInternalParticipants(newValue)
          }
        }}
        label={t('marketCodeOrCompanyName')}
        {...props}
      />
      <SimpleDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        title={t('selectSuggestedInternalParticipants')}
        content={
          suggestedInternalParticipants.map(item => 
            <CheckBox 
              key={item.userID}
              checked={selectedInternalParticipants[item.userID]}
              label={item.e_name || '-'}
              name={item.userID}
              onChange={handleSelectParticipants}
            />
          )
        }
        onConfirm={handleConfirmSelection}
      />
    </>
  )
}

export function MeetingInternalParticipants(props) {
  const { t } = useTranslation(['meeting'])
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.internalParticipants)

  return (
    <InternalUserPicker
      value={value}
      onChange={(newValue) => dispatch(setInternalParticipants(newValue))}
      label={t('internalParticipants')}
      {...props}
    />
  )
}

export function MeetingOthersParticipants(props) {
  const { t } = useTranslation(['meeting', 'login'])
  const dispatch = useDispatch()
  const value = useSelector((state) => state.meeting.otherParticipants)

  return (
    <OtherParticipantInput
      value={value}
      onChange={(newList) => dispatch(setOtherParticipants(newList))}
      label={t('otherParticipants')}
      {...props}
    />
  )
}
import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { forEach, map, some } from 'lodash'
import { capitalizeFirstLetter } from '/helpers'
import { alertError, alertSuccess, setLoading } from '/store/commonSlice'

import { 
  Paper, Grid, Avatar, Typography,
  Collapse, Switch, NoSsr
} from '@material-ui/core'
import PasswordInput from '/components/PasswordInput'
import BoxButton from '/components/BoxButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import FilePicker from '/components/FilePicker'
import MyTimePicker from '/components/MyTimePicker'
import TextInput from '/components/TextInput'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

function ProfilePicture(props) {
  const userSlice = useSelector((state) => state.user)
  const userSessionSlice = useSelector((state) => state.userSession)
  const user = userSlice.rememberMe ? userSlice.user : userSessionSlice.user
  const theme = useTheme()

  const filePickerRef = React.useRef(null)
  const selectFile = () => {
    filePickerRef.current.click()
  }

  return (
    <div style={{position: 'relative'}} onClick={selectFile}>
      <Avatar 
        style={{backgroundColor: theme.palette.primary.main, width: 200, height: 200, fontSize: 60}}
        className="pointer"
      >
        {user.firstName && user.firstName[0] || '-'}
      </Avatar>
      <AddCircleOutlineIcon color="primary" style={{position: 'absolute', bottom: 0, right: 4}} fontSize="large"/>
      <FilePicker innerRef={filePickerRef} hidden/>
    </div>
  )
}

function ChangePassword(props) {
  const { t } = useTranslation('login')
  const dispatch = useDispatch()
  const router = useRouter()

  const [firstTrial, setFirstTrial] = React.useState(true)
  const [userInput, setUserInput] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [helperTexts, setHelperTexts] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = React.useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  })
  const handleUserInput = (event) => {
    setUserInput({...userInput, [event.target.name]: event.target.value})
  }

  React.useEffect(() => {
    let newErrors = {}
    let newHelperTexts = {}
    forEach(userInput, (value, key) => {
      if (!value) {
        newErrors[key] = true
        newHelperTexts[key] = t('need'+ capitalizeFirstLetter(key))
      } else {
        newErrors[key] = false
        newHelperTexts[key] = ''
      }
    })
    if (userInput.newPassword !== userInput.confirmPassword) {
      newErrors.confirmPassword = true
      newHelperTexts.confirmPassword = t('inconsistPassword')
    }
    setHelperTexts(newHelperTexts)
    setErrors(newErrors)
  }, [userInput])

  const confirmChangePassword = () => {
    setFirstTrial(false)
    if (some(errors, (value, key) => value)) return
    try {
      dispatch(setLoading(true))
      if (userInput.oldPassword !== 'aaaaaaaa') {
        throw new Error('Wrong oldPassword')
      }
      router.replace('/login')
      dispatch(alertSuccess(t('passwordChanged')))
    } catch (e) {
      dispatch(alertError(t('wrongOldPassword')))
    } finally {
      setTimeout(() => { dispatch(setLoading(false)) }, 500)
    }
  }

  return (
    <>
      {map(userInput, (value, key) => 
        <PasswordInput
          required
          key={key} 
          label={t(key)} 
          name={key} 
          onChange={handleUserInput}
          error={!firstTrial && errors[key]}
          helperText={!firstTrial && errors[key] && helperTexts[key]}
        />
      )}
      <Grid container justifyContent="flex-end">
        <BoxButton onClick={confirmChangePassword}>{t('changePassword')}</BoxButton>
      </Grid>
    </>
  )
}

function SwitchRow(props) {
  return (
    <div style={{lineHeight: 1.6}}>
      {props.children}
    </div>
  )
}

function MeetingNotification(props) {
  const { t } = useTranslation('notification')
  const router = useRouter()

  const [active, setActive] = React.useState(true)
  const [meetingNotifications, setMeetingNotifications] = React.useState({
    newMeeting: true,
    rescheduleMeeting: true,
    cancalMeeting: true,
    tomorrowMeeting: true,
    tomorrowMeetingTime: new Date(2021, 6, 20, 21),
    beforeMeeting: true,
    beforeMeetingMinutes: '30'
  })
  const handleInput = (key, value) => {
    setMeetingNotifications({...meetingNotifications, [key]: value})
  }
  const handleMinuteInput = (key, value) => {
    const valueNumber = +value
    if (valueNumber < 0) {
      handleInput([key], '0')
    } else if (valueNumber > 360) {
      handleInput([key], '360')
    } else {
      handleInput([key], value)
    }
  }
  const handleMinuteBlur = (key) => {
    if (!meetingNotifications[key]) handleInput([key], '30')
  }

  const SelectTomorrowMeetingTime = (
    <MyTimePicker 
      value={meetingNotifications.tomorrowMeetingTime} 
      style={{width: 70}}
      className="mx-2"
      onChange={(v) => handleInput('tomorrowMeetingTime', v)}
      disabled={!meetingNotifications.tomorrowMeeting}
    />
  )

  const InputBeforeMeetingMinutes = (
    <TextInput 
      value={meetingNotifications.beforeMeetingMinutes}
      type="number"
      hideHelperText
      style={{width: 50}}
      className="mx-2"
      onChange={(event) => handleMinuteInput('beforeMeetingMinutes', event.target.value)}
      onBlur={() => handleMinuteBlur('beforeMeetingMinutes')}
      disabled={!meetingNotifications.beforeMeeting}
    />
  )

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Typography variant="h6">{t('meeting')}</Typography>
        </Grid>
        <Grid item>
          <Switch color="primary" checked={active} onChange={(event) => setActive(event.target.checked)}/>
        </Grid>
        <Grid item>
          {active ? <ExpandLess /> : <ExpandMore />}
        </Grid>
      </Grid>
      <Collapse in={active} timeout="auto" unmountOnExit>
        <SwitchRow>
          <Switch checked={meetingNotifications.newMeeting} onChange={(event) => handleInput('newMeeting', event.target.checked)}/>
          {t('newMeeting')}
        </SwitchRow>
        <SwitchRow>
          <Switch checked={meetingNotifications.rescheduleMeeting} onChange={(event) => handleInput('rescheduleMeeting', event.target.checked)}/>
          {t('rescheduleMeeting')}
        </SwitchRow>
        <SwitchRow>
          <Switch checked={meetingNotifications.cancalMeeting} onChange={(event) => handleInput('cancalMeeting', event.target.checked)}/>
          {t('cancalMeeting')}
        </SwitchRow>
        <SwitchRow>
          <Switch checked={meetingNotifications.beforeMeeting} onChange={(event) => handleInput('beforeMeeting', event.target.checked)}/>
          {
            router.locale == 'en' ?
              (
                <span>Send me an email{InputBeforeMeetingMinutes}minute(s) before a meeting starts</span>
              ) : (
                router.locale == 'zh-TW' ? 
                (
                  <span>在會議開始前{InputBeforeMeetingMinutes}分鐘發送電郵給我</span>
                ) : (
                  <span>在会议开始前{InputBeforeMeetingMinutes}分钟发送电邮给我</span>
                )
              )
          }
        </SwitchRow>
        <SwitchRow>
          <Switch checked={meetingNotifications.tomorrowMeeting} onChange={(event) => handleInput('tomorrowMeeting', event.target.checked)}/>
          {
            router.locale == 'en' ?
              (
                <span>Remind me at{SelectTomorrowMeetingTime}of tomorrow meetings </span>
              ) : (
                router.locale == 'zh-TW' ? 
                (
                  <span>在每日的{SelectTomorrowMeetingTime}提醒我明日的會議</span>
                ) : (
                  <span>在每日的{SelectTomorrowMeetingTime}提醒我明日的会议</span>
                )
              )
          }
        </SwitchRow>
      </Collapse>
    </>
  )
}

function NoteNotification(props) {
  const { t } = useTranslation('notification')
  const router = useRouter()

  const [active, setActive] = React.useState(true)
  const [noteNotifications, setNoteNotifications] = React.useState({
    newNote: true,
    mergeNote: true,
    remindToUploadNote: true,
    remindToUploadNoteMinutes: '30'
  })
  const handleInput = (key, value) => {
    setNoteNotifications({...noteNotifications, [key]: value})
  }
  const handleMinuteInput = (key, value) => {
    const valueNumber = +value
    if (valueNumber < 0) {
      handleInput([key], '0')
    } else if (valueNumber > 360) {
      handleInput([key], '360')
    } else {
      handleInput([key], value)
    }
  }
  const handleMinuteBlur = (key) => {
    if (!noteNotifications[key]) handleInput([key], '30')
  }

  const InputRemindToUploadNoteMinutes = (
    <TextInput 
      value={noteNotifications.remindToUploadNoteMinutes}
      type="number"
      hideHelperText
      style={{width: 50}}
      className="mx-2"
      onChange={(event) => handleMinuteInput('remindToUploadNoteMinutes', event.target.value)}
      onBlur={() => handleMinuteBlur('remindToUploadNoteMinutes')}
      disabled={!noteNotifications.remindToUploadNote}
    />
  )

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Typography variant="h6">{t('note')}</Typography>
        </Grid>
        <Grid item>
          <Switch color="primary" checked={active} onChange={(event) => setActive(event.target.checked)}/>
        </Grid>
        <Grid item>
          {active ? <ExpandLess /> : <ExpandMore />}
        </Grid>
      </Grid>
      <Collapse in={active} timeout="auto" unmountOnExit>
        <SwitchRow>
          <Switch checked={noteNotifications.newNote} onChange={(event) => handleInput('newNote', event.target.checked)}/>
          {t('newNote')}
        </SwitchRow>
        <SwitchRow>
          <Switch checked={noteNotifications.mergeNote} onChange={(event) => handleInput('mergeNote', event.target.checked)}/>
          {t('mergeNote')}
        </SwitchRow>
        <SwitchRow style={{lineHeight: 2}}>
          <Switch checked={noteNotifications.remindToUploadNote} onChange={(event) => handleInput('remindToUploadNote', event.target.checked)}/>
          {
            router.locale == 'en' ?
              (
                <span>Send me an email{InputRemindToUploadNoteMinutes}minute(s) after a meeting if I forget to upload notes</span>
              ) : (
                router.locale == 'zh-TW' ? 
                (
                  <span>在會議結束後{InputRemindToUploadNoteMinutes}分鐘提醒我上載會議記錄</span>
                ) : (
                  <span>在会议结束后{InputRemindToUploadNoteMinutes}分钟提醒我上载会议记录</span>
                )
              )
          }
        </SwitchRow>
      </Collapse>
    </>
  )
}

export default function Account() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('account')))
  }, [])

  return (
    <NoSsr>
      <Paper elevation={5} className="px-4 py-4">
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={3} container justifyContent="center">
            <ProfilePicture/>
          </Grid>
          <Grid item xs={12} md={9}>
            <ChangePassword/>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={5} className="px-4 py-4 mt-4">
        <MeetingNotification/>
      </Paper>

      <Paper elevation={5} className="px-4 py-4 mt-4">
        <NoteNotification/>
      </Paper>
    </NoSsr>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'login', 'notification']),
  },
})
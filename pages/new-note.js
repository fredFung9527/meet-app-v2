import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle, setMeetingOfCurrentNote, alertSuccess, alertError } from '/store/commonSlice'
import { useRouter } from 'next/router'
import { useMediaQuery } from '@material-ui/core'
import { sampleMeeting } from '/data/sample-meeting'
import { initNote } from '/store/noteSlice'
import { getLocalNote, saveLocalNote } from '/db'
import { debounce, some } from 'lodash'

import SelectMeeting from '/components/note/SelectMeeting'
import MyTabs from '/components/MyTabs'
import { 
  AppBar, Fab
} from '@material-ui/core'
import NoteSettings from '/components/note/NoteSettings'
import NoteQuestions from '/components/note/NoteQuestions'
import NoteMeeting from '/components/note/NoteMeeting'
import NoteAlbum from '/components/note/NoteAlbum'
import NoteProduct from '/components/note/NoteProduct'
import NoteProject from '/components/note/NoteProject'
import NoteCommon from '/components/note/NoteCommon'
import NotePreview from '/components/note/NotePreview'

import DateRangeIcon from '@material-ui/icons/DateRange'
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import DoneAllIcon from '@material-ui/icons/DoneAll'

function UploadButton(props) {
  const { t } = useTranslation(['common'])
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)

  const tryUpload = () => {
    if (!props.canUpload) {
      dispatch(alertError(t('noNotePoint')))
      return
    }
    setOpen(true)
  }

  const confirmUpload = async() => {
    setOpen(false)
    dispatch(alertSuccess(t('uploaded')))
  }

  return (
    <>
      <Fab
        onClick={tryUpload}
        size="medium"
        color="primary"
        style={{position: 'fixed', bottom: '15px', right: '15px'}}
      >
        <DoneAllIcon />
      </Fab>
      <NotePreview open={open} onClose={() => setOpen(false)} onConfirm={confirmUpload} note={{noteName: 'Confirm to upload this note?'}}/>
    </>
  )
}

export default function NewNote() {
  const { t } = useTranslation(['common', 'note'])
  const dispatch = useDispatch()
  const router = useRouter()
  const isLgUpScreen = useMediaQuery(theme => theme.breakpoints.up('lg'))

  React.useEffect(() => {
    dispatch(setTitle(t('newNote')))
    dispatch(setMeetingOfCurrentNote(null))
  }, [])

  const [meeting, setMeeting] = React.useState(null)
  React.useEffect(() => {
    const meetingID = router.query.meeting || null
    if (meetingID) {
      setMeeting(sampleMeeting)
    }
  }, [router.query.meeting])
  React.useEffect(async () => {
    if (!meeting || !meeting._id) return
    dispatch(setMeetingOfCurrentNote(meeting))
    const currentLocalNote = await getLocalNote(meeting._id)
    if (currentLocalNote && currentLocalNote.meeting) {
      dispatch(initNote(currentLocalNote))
    } else {
      dispatch(initNote({meeting: meeting._id, noteName: meeting.title, createdAt: new Date()}))
    }
  }, [meeting])

  const currentNote = useSelector((state) => state.note)
  const saveLocalNoteDenoubce = React.useMemo(() => {
    return debounce((newNote) => saveLocalNote(newNote), 1000)
  }, [isLgUpScreen])
  React.useEffect(() => {
    if (!currentNote.meeting) return
    try {
      saveLocalNoteDenoubce(currentNote)
    } catch (e) { console.log('fail to store in local database') }
  }, [currentNote])

  const albumNotes = useSelector((state) => state.note.albumNotes)
  const productNotes = useSelector((state) => state.note.productNotes)
  const questionNotes = useSelector((state) => state.note.questionNotes)
  const projectNotes = useSelector((state) => state.note.projectNotes)
  const commonNotes = useSelector((state) => state.note.commonNotes)
  const tabs = [
    { text: t('note:meeting'), value: 'meeting', icon: <DateRangeIcon/> },
    { text: t('note:album'), value: 'album', icon: <PhotoAlbumIcon/>, count: albumNotes.length },
    { text: t('note:product'), value: 'product', icon: <ShoppingBasketIcon/>, count: productNotes.length },
    { text: t('note:question'), value: 'question', icon: <HelpOutlineIcon/>, count: questionNotes.length },
    { text: t('note:project'), value: 'project', icon: <AccountTreeIcon/>, count: projectNotes.length },
    { text: t('note:common'), value: 'common', icon: <ChatBubbleOutlineIcon/>, count: commonNotes.length },
    { text: t('note:setting'), value: 'setting', icon: <SettingsIcon/> },
  ]
  const [currentTab, setCurrentTab] = React.useState(tabs[0].value)
  React.useEffect(() => {
    if (!meeting || !meeting._id) return
    router.push({
      pathname: router.pathname,
      query: {...router.query, tab: currentTab}
    })
  }, [currentTab])
  React.useEffect(() => {
    const tab = router.query.tab
    if (!tab || tab === currentTab) return
    setCurrentTab(tab)
  }, [router.query.tab])

  if (!meeting || !meeting._id) return <SelectMeeting meeting={meeting} setMeeting={setMeeting}/>
  return (
    <>
      <AppBar
        elevation={5}
        position={isLgUpScreen ? 'static' : 'sticky' } color="inherit" 
        style={isLgUpScreen ? null : {marginTop: -10, marginLeft: -10, marginRight: -10, width: 'calc(100% + 20px)'}}
      >
        <MyTabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={tabs} style={{minWidth: 100}} centered/>
      </AppBar>

      {currentTab === 'meeting' && <NoteMeeting/>}
      {currentTab === 'album' && <NoteAlbum/>}
      {currentTab === 'product' && <NoteProduct/>}
      {currentTab === 'project' && <NoteProject/>}
      {currentTab === 'question' && <NoteQuestions/>}
      {currentTab === 'common' && <NoteCommon/>}
      {currentTab === 'setting' && <NoteSettings/>}

      <UploadButton canUpload={some([albumNotes, productNotes, questionNotes, projectNotes, commonNotes], it => it.length)}/>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'note', 'meeting', 'login']),
  },
})
import { useTranslation } from 'next-i18next'
import { sampleMeeting } from '/data/sample-meeting'
import { formatDate } from '/helpers'
import { useSelector } from 'react-redux'
import { addMinutes } from 'date-fns'
import { fakeAlbums } from '/data/note'

import { 
  Grid, Dialog, AppBar, Toolbar, Typography, DialogContent,
  Paper, Divider, DialogActions
} from '@material-ui/core'
import IconButton from '../IconButton'
import TextButton from '../TextButton'

import CloseIcon from '@material-ui/icons/Close'
import ScheduleIcon from '@material-ui/icons/Schedule'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import BusinessIcon from '@material-ui/icons/Business'
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

export default function NotePreview(props) {
  const { t } = useTranslation(['common', 'note', 'meeting'])
  const settingsState = useSelector((state) => state.settings)

  const note = props.note || {}
  const meeting = sampleMeeting

  return (
    <Dialog open={props.open} onClose={props.onClose} fullScreen>
      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
            <Typography variant="h6">{note.noteName}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={props.onClose} color="inherit"><CloseIcon/></IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DialogContent className="py-2">
        <Grid container alignItems="center" className="mb-1">
          <InfoOutlinedIcon color="primary"/>
          <Typography variant="h6" className="ml-1">{t('note:info')}</Typography>
        </Grid>
        <Paper elevation={5} className="px-2 py-2">
          <Typography variant="h6">{t('note:meeting')}</Typography>
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

          <Divider className="my-2"/>
          <Typography variant="h6">{t('meeting:internalParticipants')}</Typography>
          <ul>
            <li>Fred Fung</li>
            <li>Keith Wong</li>
          </ul>

          <Divider className="my-2"/>
          <Typography variant="h6">{t('meeting:otherParticipants')}</Typography>
          <ul>
            <li>User A / aa@aa.com / Manager / 12345678</li>
          </ul>

          <Divider className="my-2"/>
          <Typography variant="h6">{t('note:readers')}</Typography>
          <ul>
            <li>Fred Fung</li>
            <li>Keith Wong</li>
          </ul>

          <Divider className="my-2"/>
          <Typography variant="h6">{t('note:collaborators')}</Typography>
          <ul>
            <li>Fred Fung</li>
            <li>Keith Wong</li>
          </ul>
        </Paper>

        <Grid container alignItems="center" className="mb-1 mt-2">
          <PhotoAlbumIcon color="primary"/>
          <Typography variant="h6" className="ml-1">{t('note:album')}</Typography>
        </Grid>
        <Paper elevation={5} className="px-2 py-2">
          <Typography variant="h6">{fakeAlbums[0].name}</Typography>
          <ul>
            <li><span className="bold">{t('by')}</span>: User A</li>
            <li><span className="bold">{t('sample')}</span>: 2</li>
            <li><span className="bold">{t('sampleRemark')}</span>: <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></li>
            <li><span className="bold">{t('comment')}</span>: <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></li>
          </ul>
        </Paper>

        <Grid container alignItems="center" className="mb-1 mt-2">
          <ShoppingBasketIcon color="primary"/>
          <Typography variant="h6" className="ml-1">{t('note:product')}</Typography>
        </Grid>
        <Paper elevation={5} className="px-2 py-2">
          <Typography variant="h6">g.Stealth® Whistle Single Adj. Buckle (Version A)</Typography>
          <ul>
            <li><span className="bold">{t('by')}</span>: User A</li>
            <li><span className="bold">{t('sample')}</span>: 15mm * 2, 20mm * 1</li>
            <li><span className="bold">{t('sampleRemark')}</span>: <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></li>
            <li><span className="bold">{t('comment')}</span>: <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></li>
          </ul>
        </Paper>

        <Grid container alignItems="center" className="mb-1 mt-2">
          <HelpOutlineIcon color="primary"/>
          <Typography variant="h6" className="ml-1">{t('note:question')}</Typography>
        </Grid>
        <Paper elevation={5} className="px-2 py-2">
          <Typography variant="h6">Business & Sales Forecast</Typography>
          <ul>
            <li><span className="bold">Option A</span> - 4</li>
            <li><span className="bold">Option B</span> - 3</li>
          </ul>
        </Paper>

        <Grid container alignItems="center" className="mb-1 mt-2">
          <AccountTreeIcon color="primary"/>
          <Typography variant="h6" className="ml-1">{t('note:project')}</Typography>
        </Grid>
        <Paper elevation={5} className="px-2 py-2">
          <Typography variant="h6">g.Stealth® Whistle Single Adj. Buckle (Version A)</Typography>
          <ul>
            <li><span className="bold">{t('by')}</span>: User A</li>
            <li><span className="bold">{t('comment')}</span>: <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></li>
          </ul>
        </Paper>

        <Grid container alignItems="center" className="mb-1 mt-2">
          <ChatBubbleOutlineIcon color="primary"/>
          <Typography variant="h6" className="ml-1">{t('note:common')}</Typography>
        </Grid>
        <Paper elevation={5} className="px-2 py-2">
          <ul>
            <li><span className="bold">{t('by')}</span>: User A</li>
            <li><span className="bold">{t('comment')}</span>: <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></li>
          </ul>
        </Paper>
      </DialogContent>
      <DialogActions>
        <TextButton color="primary">
          {t('download')}
        </TextButton>
        {props.onConfirm && <TextButton onClick={props.onConfirm} color="primary">
          {t('confirm')}
        </TextButton>}
      </DialogActions>
    </Dialog>
  )
}
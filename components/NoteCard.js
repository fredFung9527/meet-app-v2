import React from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { formatDate, dateFromUTC } from '/helpers'
import db from '/db'
import { alertSuccess } from '/store/commonSlice'

import { 
  Grid, Divider, Typography
} from '@material-ui/core'
import IconButton from '/components/IconButton'
import SimpleDialog from './SimpleDialog'
import NotePreview from '/components/note/NotePreview'

import ListAltIcon from '@material-ui/icons/ListAlt'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function RemoveButton(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation('note')
  const [open, setOpen] = React.useState(false)

  const confirmDelete = async () => {
    if (props.uploadStatus === 'local') {
      await db.notes.delete(props.note.meeting)
      props.loadNotes()
    }

    dispatch(alertSuccess(t('noteDeleted')))
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={(event) => {event.stopPropagation(); setOpen(true)}}>
        <DeleteIcon color="secondary"/>
      </IconButton>
      <SimpleDialog
        warning
        open={open} 
        onClose={() => setOpen(false)} 
        title={t('confirmDeleteNote')}
        content={
          <span>{t('confirmDeleteNoteHint')}</span>
        }
        onConfirm={confirmDelete}
      />
    </>
  )
}

function PreviewButton(props) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton onClick={(event) => {event.stopPropagation(); setOpen(true)}}>
        <ListAltIcon color="primary"/>
      </IconButton>
      <NotePreview open={open} onClose={() => setOpen(false)} note={props.note}/>
    </>
  )
}

export default function NoteCard(props) {
  const settingsState = useSelector((state) => state.settings)
  const theme = useTheme()
  const note = props.note || {}

  return (
    <>
      <Grid container alignItems="center" spacing={2} className="py-2 px-2">
        <Grid item xs="12" sm>
          <Typography variant="h6">
            {note.noteName}
          </Typography>
          <div style={{color: theme.palette.greyColor.main}}>
            {formatDate(dateFromUTC(note.createdAt), `${settingsState.dateFormat} ${settingsState.timeFormat}`)}
          </div>
        </Grid>
        <Grid item xs="12" sm={'auto'}>
          <Grid container alignItems="center" justifyContent="flex-end">
            <IconButton to="/new-note">
              <EditIcon color="primary"/>
            </IconButton>
            <PreviewButton {...props}/>
            <RemoveButton {...props}/>
          </Grid>
        </Grid>
      </Grid>
      <Divider/>
    </>
  )
}
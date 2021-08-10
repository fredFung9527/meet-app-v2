import React from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { deleteProject } from '/store/noteSlice'
import { alertSuccess } from '/store/commonSlice'

import {
  Grid, Paper, Typography, Badge
} from '@material-ui/core'
import DropNoteDialog from './DropNoteDialog'
import IconButton from '../IconButton'
import SimpleDialog from '../SimpleDialog'

import CloseIcon from '@material-ui/icons/Close'

function RemobeButton(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation('note')
  const [open, setOpen] = React.useState(false)

  const confirmDelete = () => {
    dispatch(deleteProject(props.project))
    dispatch(alertSuccess(t('projectDeleted')))
    setOpen(false)
  }

  return (
    <>
      <IconButton color="primary" onClick={(event) => {event.stopPropagation(); setOpen(true)}}>
        <CloseIcon/>
      </IconButton>
      <SimpleDialog
        warning
        open={open} 
        onClose={() => setOpen(false)} 
        title={t('confirmDeleteProject')}
        content={
          <span>{t('confirmDeleteProjectHint')}</span>
        }
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default function ProjectCardWithNote(props) {
  const [open, setOpen] = React.useState(false)
  const [totalNotes, setTotalNotes] = React.useState(0)

  return (
    <>
      <Badge
        badgeContent={totalNotes}
        invisible={!totalNotes}
        max={9}
        color="primary" 
        className="pointer full-width"
      >
        <Paper elevation={5} className="full-width">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs onClick={() => setOpen(true)} className="pl-4 py-4">
              <Typography variant="h6">{props.project}</Typography>
            </Grid>
            <Grid item className="pr-4 py-4">
              <RemobeButton project={props.project}/>
            </Grid>
          </Grid>
        </Paper>
      </Badge>
      <DropNoteDialog 
        {...props} 
        open={open} 
        onClose={() => setOpen(false)} 
        noteSlicefield="projectNotes" 
        idName="project"
        _id={props.project}
        name={props.project}
        setTotalNotes={setTotalNotes}
        inputFields={[
          { key: 'comment', multiline: true, className: 'mt-4' },
        ]}
      />
    </>
  )
}
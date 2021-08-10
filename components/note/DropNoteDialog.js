import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { setList } from '/store/noteSlice'
import { filter, find, forEach, groupBy, map, mapValues, indexOf } from 'lodash'
import { alertSuccess } from '/store/commonSlice'

import LargeDialog from '../LargeDialog'
import MeetingParticipantAvatars from '../MeetingParticipantAvatars'
import NumberStepper from '../NumberStepper'
import TextInput from '../TextInput'
import { Grid, Typography } from '@material-ui/core'
import SignatureButton from '../SignatureButton'
import UploadAttachmentButton from '../UploadAttachmentButton'
import AttachmentList from '../AttachmentList'
import TextButton from '../TextButton'

export default function DropNoteDialog(props) {
  const { t } = useTranslation(['common', 'note'])
  const dispatch = useDispatch()

  const projects = useSelector((state) => state.note.projects)
  const addToProject = () => {
    dispatch(setList({
      target: 'projects',
      list: [...projects, props.name]
    }))
    dispatch(alertSuccess(t('note:addedToProject')))
  }

  const allNotes = useSelector((state) => state.note[props.noteSlicefield])
  const relatedNotes = filter(allNotes, it => it[props.idName] == props._id)
  props.setTotalNotes && props.setTotalNotes(relatedNotes.length)
  const participantNotesCount = mapValues(groupBy(relatedNotes, 'by'), v => v.length || 0)
  const [selectedParticipant, setSelectedParticipant] = React.useState('all')

  const saveNotes = (v) => {
    dispatch(setList({
      target: props.noteSlicefield, 
      list: v || []
    }))
  }
  const getValue = (key) => {
    const note = find(relatedNotes, it => it.key === key && it.by === selectedParticipant)
    return note && note.value || ''
  }
  const handleInput = (key, value) => {
    if (value) {
      const oldNote = find(relatedNotes, it => it.key === key && it.by === selectedParticipant)
      if (oldNote) {
        saveNotes(map(allNotes, it => {
          if (it[props.idName] == props._id && it.key === key && it.by === selectedParticipant) {
            return {...it, value: value}
          } else {
            return it
          }
        }))
      } else {
        saveNotes([...allNotes, {
          [props.idName]: props._id,
          key: key,
          by: selectedParticipant,
          value: value
        }])
      }
    } else {
      saveNotes(filter(allNotes, it => it[props.idName] != props._id || it.key !== key || it.by !== selectedParticipant))
    }
  }

  const getAttachments = () => {
    let result = []
    forEach(relatedNotes, it => {
      if (it.key === 'file' && it.by === selectedParticipant && it.value) result.push(it.value)
    })
    return result
  }
  const addAttachment = (type, v) => {
    saveNotes([...allNotes, {
      [props.idName]: props._id,
      key: 'file',
      by: selectedParticipant,
      value: {
        type: type,
        src: v
      }
    }])
  }
  const removeAttachment = (index) => {
    let currentIdx = 0
    let newList = []
    forEach(allNotes, it => {
      if (it[props.idName] == props._id && it.key === 'file' && it.by === selectedParticipant) {
        if (currentIdx !== index) {
          newList.push(it)
        }
        currentIdx += 1
      } else {
        newList.push(it)
      }
    })
    saveNotes(newList)
  }
  const editDrawer = (index, v) => {
    let currentIdx = 0
    let newList = []
    forEach(allNotes, it => {
      if (it[props.idName] == props._id && it.key === 'file' && it.by === selectedParticipant) {
        if (currentIdx === index) {
          newList.push({
            ...it,
            value: { type: it.value.type, src: v }
          })
        } else {
          newList.push(it)
        }
        currentIdx += 1
      } else {
        newList.push(it)
      }
    })
    saveNotes(newList)
  }

  return (
    <LargeDialog
      open={props.open} onClose={props.onClose}
      title={props.name}
      actions={
        <>
          {props.idName === 'product' && 
            <TextButton color="primary" size="large" onClick={addToProject} disabled={indexOf(projects, props.name) >= 0}>
              {t('note:addToProject')}
            </TextButton>
          }
          <SignatureButton onChange={(v) => addAttachment('drawer', v)}/>
          <UploadAttachmentButton onChange={(v) => addAttachment('localFile', v)}/>
        </>
      }
    >
      <MeetingParticipantAvatars
        coutMapping={participantNotesCount}
        value={selectedParticipant}
        onChange={(v) => setSelectedParticipant(v)}
      />
      {props.singleSample && <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h6">{t('sample')}:</Typography>
        </Grid>
        <Grid item>
          <NumberStepper value={getValue('sampleRequest')} onChange={(v) => handleInput('sampleRequest', v)} notNegative/>
        </Grid>
      </Grid>}
      {props.sizes && props.sizes.length && <>
        <Typography variant="h6" className="mt-3">{t('sample')}:</Typography>
        <Grid container alignItems="center" spacing={2}>
          {props.sizes.map(size => 
            <Grid item key={size}>
              <NumberStepper name={size} value={getValue('sampleRequest-'+size)} onChange={(v) => handleInput('sampleRequest-'+size, v)} notNegative/>
            </Grid>
          )}
        </Grid>
      </>}
      {props.inputFields && props.inputFields.length && <Grid container alignItems="center" spacing={2}>
        {props.inputFields.map(item => 
          <Grid item xs={12} key={item.key} className={item.className || ''}>
            <TextInput
              multiline={item.multiline}
              rows={item.multiline ? (item.rows || 4) : 1}
              label={t(item.key)} 
              value={getValue(item.key)} 
              onChange={(event) => handleInput(item.key, event.target.value)}
            />
          </Grid>
        )}
      </Grid>}

      <AttachmentList files={getAttachments()} onRemove={removeAttachment} onEditDrawder={editDrawer}/>
    </LargeDialog>
  )
}
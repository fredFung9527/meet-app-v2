import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { setList } from '/store/noteSlice'
import { filter, find, forEach, groupBy, map, mapValues } from 'lodash'

import {
  Grid
} from '@material-ui/core'
import MeetingParticipantAvatars from '../MeetingParticipantAvatars'
import TextInput from '../TextInput'
import SignatureButton from '../SignatureButton'
import UploadAttachmentButton from '../UploadAttachmentButton'
import AttachmentList from '../AttachmentList'

export default function NoteCommon(props) {
  const { t } = useTranslation(['common', 'note'])
  const dispatch = useDispatch()

  const relatedNotes = useSelector((state) => state.note.commonNotes)
  const participantNotesCount = mapValues(groupBy(relatedNotes, 'by'), v => v.length || 0)
  const [selectedParticipant, setSelectedParticipant] = React.useState('all')
  
  const saveNotes = (v) => {
    dispatch(setList({
      target: 'commonNotes', 
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
        saveNotes(map(relatedNotes, it => {
          if (it.key === key && it.by === selectedParticipant) {
            return {...it, value: value}
          } else {
            return it
          }
        }))
      } else {
        saveNotes([...relatedNotes, {
          key: key,
          by: selectedParticipant,
          value: value
        }])
      }
    } else {
      saveNotes(filter(relatedNotes, it => it.key !== key || it.by !== selectedParticipant))
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
    saveNotes([...relatedNotes, {
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
    forEach(relatedNotes, it => {
      if (it.key === 'file' && it.by === selectedParticipant) {
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
    forEach(relatedNotes, it => {
      if (it.key === 'file' && it.by === selectedParticipant) {
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
    <div className="mx-2 mt-2">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <MeetingParticipantAvatars
            coutMapping={participantNotesCount}
            value={selectedParticipant}
            onChange={(v) => setSelectedParticipant(v)}
          />
        </Grid>
        <Grid item>
          <SignatureButton onChange={(v) => addAttachment('drawer', v)}/>
          <UploadAttachmentButton onChange={(v) => addAttachment('localFile', v)}/>
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={2} className="mt-3">
        <Grid item xs={12}>
          <TextInput
            multiline
            rows={4}
            label={t('comment')} 
            value={getValue('comment')} 
            onChange={(event) => handleInput('comment', event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            multiline
            rows={4}
            label={t('note:publicNote')} 
            value={getValue('publicNote')} 
            onChange={(event) => handleInput('publicNote', event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            multiline
            rows={4}
            label={t('note:customerRecap')} 
            value={getValue('customerRecap')} 
            onChange={(event) => handleInput('customerRecap', event.target.value)}
          />
        </Grid>
      </Grid>
      <AttachmentList files={getAttachments()} onRemove={(index) => removeAttachment(index)} onEditDrawder={editDrawer}/>
    </div>
  )
}
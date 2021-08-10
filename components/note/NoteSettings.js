import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { setList } from '/store/noteSlice'

import {
  Typography, Grid
} from '@material-ui/core'
import TextDivider from '../TextDivider'
import InternalUserPicker from '../InternalUserPicker'

export default function NoteSettings(props) {
  const readers = useSelector((state) => state.note.readers)
  const collaborators = useSelector((state) => state.note.collaborators)
  const dispatch = useDispatch()
  const { t } = useTranslation(['common', 'note'])

  return (
    <div className="px-2">
      <div className="mt-3">
        <TextDivider text={<Typography variant="h6">{t('optional')}</Typography>}/>
      </div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <InternalUserPicker
            label={t('note:readers')}
            value={readers} 
            onChange={newValue => dispatch(setList({target: 'readers', list: newValue}))}
          />
        </Grid>
        <Grid item xs={12}>
          <InternalUserPicker
            label={t('note:collaborators')}
            value={collaborators} 
            onChange={newValue => dispatch(setList({target: 'collaborators', list: newValue}))}
          />
        </Grid>
      </Grid>
    </div>
  )
}
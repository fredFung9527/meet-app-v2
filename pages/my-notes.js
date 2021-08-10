import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { addMonths, endOfDay, startOfDay } from 'date-fns'
import { cloneDeep } from 'lodash'
import db from '/db'
import { dateToDB } from '/helpers'

import MyToggle from '/components/MyToggle'
import MyDatePicker from '/components/MyDatePicker'
import TextButton from '/components/TextButton'
import LargeDialog from '/components/LargeDialog'
import IconButton from '/components/IconButton'
import TextInput from '/components/TextInput'
import NoteCard from '/components/NoteCard'
import Pagination from '@material-ui/lab/Pagination'
import { 
  Grid, DialogActions, InputAdornment, List, Divider
} from '@material-ui/core'

import ComputerIcon from '@material-ui/icons/Computer'
import CloudIcon from '@material-ui/icons/Cloud'
import FilterListIcon from '@material-ui/icons/FilterList'
import SortIcon from '@material-ui/icons/Sort'
import SearchIcon from '@material-ui/icons/Search'

function FilterButton(props) {
  const { t } = useTranslation(['common', 'note'])
  const [open, setOpen] = React.useState(false)

  const [filterSettingsClone, setFilterSettingsClone] = React.useState(cloneDeep(props.filterSettings))
  const handleInput = (key, value) => {
    setFilterSettingsClone({...filterSettingsClone, [key]: value})
  }

  return (
    <>
      <TextButton color="primary" onClick={() => setOpen(true)}>
        <FilterListIcon className="mr-1"/>{t('filter')}
      </TextButton>
      <LargeDialog
        onClose={() => {setOpen(false);props.setFilterSettings(filterSettingsClone)}} 
        open={open}
        title={t('filter')}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <MyDatePicker
              required
              fullWidth 
              label={t('dateFrom')}
              value={filterSettingsClone.dateFrom}
              onChange={(newDateTime) => handleInput('dateFrom', newDateTime)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MyDatePicker
              required
              fullWidth 
              label={t('dateTo')}
              value={filterSettingsClone.dateTo}
              onChange={(newDateTime) => handleInput('dateTo', newDateTime)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              label={t('keyword')}
              placeholder={t('note:keywordHint')}
              value={filterSettingsClone.keyword}
              onChange={(event) => handleInput('keyword', event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </LargeDialog>
    </>
  )
}

export default function MyNotes() {
  const { t } = useTranslation('common', 'note')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('myNotes')))
  }, [])

  const uploadStatuses = [
    { text: t('note:local'), value: 'local', icon: <ComputerIcon className="mr-1"/> },
    { text: t('note:uploaded'), value: 'uploaded', icon: <CloudIcon className="mr-1"/> },
  ]
  const [filterSettings, setFilterSettings] = React.useState({
    uploadStatus: uploadStatuses[0].value,
    dateFrom: startOfDay(addMonths(new Date(), -1)),
    dateTo: endOfDay(new Date()),
    keyword: ''
  })
  const setCurrentUploadStatus = (v) => {
    setFilterSettings({...filterSettings, uploadStatus: v})
  }

  const [descending, setDescending] = React.useState(true)
  const [notes, setNotes] = React.useState([])

  const loadNotes = async () => {
    if (filterSettings.uploadStatus === 'local') {
      setNotes(await db.notes.where('createdAt').between(dateToDB(filterSettings.dateFrom), dateToDB(filterSettings.dateTo), true, true).toArray())
    } else {
      setNotes([])
    }
  }
  React.useEffect(() => {
    loadNotes()
  }, [filterSettings])

  return (
    <>
      <DialogActions>
        <MyToggle value={filterSettings.uploadStatus} onChange={setCurrentUploadStatus} options={uploadStatuses} centered/>
        <FilterButton filterSettings={filterSettings} setFilterSettings={setFilterSettings}/>
        <IconButton color="primary" onClick={() => setDescending(!descending)}><SortIcon/></IconButton>
      </DialogActions>
      <Divider/>
      <List style={{paddingTop: 0, paddingBottom: 0}}>
        {notes.map((note, idx) => <NoteCard key={idx} note={note} uploadStatus={filterSettings.uploadStatus} loadNotes={loadNotes}/>)}
      </List>
      <Grid container justifyContent="center" className="mt-2">
        <Pagination count={10} color="primary"/>
      </Grid>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'note']),
  },
})
import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { addMonths, endOfDay, startOfDay } from 'date-fns'
import { cloneDeep, mapValues, keyBy } from 'lodash'
import { meetingTypes, showcaseSeasons } from '/data/meeting-settings'
import { getYearOptions } from '/helpers'

import MyDatePicker from '/components/MyDatePicker'
import TextButton from '/components/TextButton'
import LargeDialog from '/components/LargeDialog'
import IconButton from '/components/IconButton'
import TextInput from '/components/TextInput'
import NoteCard from '/components/NoteCard'
import Pagination from '@material-ui/lab/Pagination'
import CheckBoxGroup from '/components/CheckBoxGroup'
import InternalUserPicker from '/components/InternalUserPicker'
import { 
  Grid, DialogActions, InputAdornment, List, Divider
} from '@material-ui/core'

import FilterListIcon from '@material-ui/icons/FilterList'
import SortIcon from '@material-ui/icons/Sort'
import SearchIcon from '@material-ui/icons/Search'

function FilterButton(props) {
  const { t } = useTranslation(['common', 'note', 'meeting'])
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
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:meetingType')} selected={filterSettingsClone.selectedMeetingTypes} onChange={(v) => handleInput('selectedMeetingTypes', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:showcaseYear')} selected={filterSettingsClone.selectedYears} onChange={(v) => handleInput('selectedYears', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:showcaseSeason')} selected={filterSettingsClone.selectedSeasons} onChange={(v) => handleInput('selectedSeasons', v)}/>
          </Grid>
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
            <InternalUserPicker
              label={t('uploaders')}
              value={filterSettingsClone.uploaders} 
              onChange={newValue => handleInput('uploaders', newValue)}
            />
          </Grid>
          <Grid item xs={12}>
            <InternalUserPicker
              label={t('managers')}
              value={filterSettingsClone.uploaders} 
              onChange={newValue => handleInput('uploaders', newValue)}
            />
          </Grid>
          <Grid item xs={12}>
            <InternalUserPicker
              label={t('developers')}
              value={filterSettingsClone.uploaders} 
              onChange={newValue => handleInput('uploaders', newValue)}
            />
          </Grid>
          <Grid item xs={12}>
            <InternalUserPicker
              label={t('advisors')}
              value={filterSettingsClone.uploaders} 
              onChange={newValue => handleInput('uploaders', newValue)}
            />
          </Grid>
          <Grid item xs={12}>
            <InternalUserPicker
              label={t('assistants')}
              value={filterSettingsClone.uploaders} 
              onChange={newValue => handleInput('uploaders', newValue)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              label={t('keyword')}
              placeholder={t('meeting:meetingKeyword')}
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

export default function Notes() {
  const { t } = useTranslation('common', 'note')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('notes')))
  }, [])

  const [filterSettings, setFilterSettings] = React.useState({
    dateFrom: startOfDay(addMonths(new Date(), -1)),
    dateTo: endOfDay(new Date()),
    selectedMeetingTypes: mapValues(keyBy(meetingTypes, 'id'), v => true),
    selectedYears: mapValues(keyBy(getYearOptions(), it => it), v => true),
    selectedSeasons: mapValues(keyBy(showcaseSeasons, 'id'), v => true),
    uploaders: [],
    keyword: '',
  })

  const [descending, setDescending] = React.useState(true)
  const [notes, setNotes] = React.useState([
    { noteName: '2021-Summer-Showcase-OR-CompanyA-Topic', createdAt: new Date(2021, 7, 10) }
  ])


  return (
    <>
      <DialogActions>
        <FilterButton filterSettings={filterSettings} setFilterSettings={setFilterSettings}/>
        <IconButton color="primary" onClick={() => setDescending(!descending)}><SortIcon/></IconButton>
      </DialogActions>
      <Divider/>
      <List style={{paddingTop: 0, paddingBottom: 0}}>
        {notes.map((note, idx) => <NoteCard key={idx} note={note} uploadStatus={filterSettings.uploadStatus}/>)}
      </List>
      <Grid container justifyContent="center" className="mt-2">
        <Pagination count={10} color="primary"/>
      </Grid>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'note', 'meeting']),
  },
})
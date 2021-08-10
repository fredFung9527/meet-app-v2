import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { setLoading, alertError } from '/store/commonSlice'
import { cloneDeep, mapValues, keyBy } from 'lodash'
import { dateToDB } from '/helpers'
import { makeStyles } from '@material-ui/core/styles'
import { meetingStatuseColors, meetingTypes } from '/data/meeting-settings'

import { 
  Paper, Grid, Typography, NoSsr, InputAdornment,
  DialogActions, 
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import TextButton from '/components/TextButton'
import LargeDialog from '/components/LargeDialog'
import TextInput from '/components/TextInput'
import CheckBoxGroup from '/components/CheckBoxGroup'
import Legend from '/components/schedule/legend'
import SimpleDialog from '/components/SimpleDialog'
import MyRadioGroup from '/components/MyRadioGroup'
import InternalUserPicker from '/components/InternalUserPicker'

import FilterListIcon from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'
import SortIcon from '@material-ui/icons/Sort'
import ErrorIcon from '@material-ui/icons/Error'

const yearSortingKeys = ['descending', 'ascending']
const companySortingKeys = ['meetingCountDesc', 'meetingCountAsc', 'companyNameDesc', 'companyNameAsc']

function SummaryByCompanySorting(props) {
  const { t } = useTranslation('common')
  const [open, setOpen] = React.useState(false)

  const [sortingCriteriaClone, setSortingCriteriaClone] = React.useState(props.sortingCriteria)
  const handleInput = (key, value) => {
    setSortingCriteriaClone({...sortingCriteriaClone, [key]: value})
  }

  const yearSortingOptions = yearSortingKeys.map(key => {
    return { id: key, text: t(key) }
  })
  const companySortings = companySortingKeys.map(key => {
    return { id: key, text: t(key) }
  })

  return (
    <>
      <TextButton color="primary" onClick={() => setOpen(true)}>
        <SortIcon className="mr-1"/>{t('sorting')}
      </TextButton>
      <SimpleDialog 
        onClose={() => {props.setSortingCriteria(sortingCriteriaClone);setOpen(false)}} 
        open={open} 
        title={t('sorting')}
        content={
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <MyRadioGroup
                label={t('year')}
                value={sortingCriteriaClone.year}
                onChange={(event) => handleInput('year', event.target.value)}
                options={yearSortingOptions}
              />
            </Grid>
            <Grid item xs={12}>
              <MyRadioGroup
                label={t('companyName')}
                value={sortingCriteriaClone.companyName}
                onChange={(event) => handleInput('companyName', event.target.value)}
                options={companySortings}
              />
            </Grid>
          </Grid>
        }
        noConfirm
      />
    </>
  )
}

function FilterButton(props) {
  const { t } = useTranslation(['common', 'meeting'])
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
            <Legend label={t('status')} selectedStatuses={filterSettingsClone.selectedStatuses} setSelectedStatuses={(v) => handleInput('selectedStatuses', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:meetingType')} selected={filterSettingsClone.selectedMeetingTypes} onChange={(v) => handleInput('selectedMeetingTypes', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('role')} selected={filterSettingsClone.selectRoles} onChange={(v) => handleInput('selectRoles', v)}/>
          </Grid>
          <Grid item xs={12}>
            <InternalUserPicker
              label={t('subordinates')}
              value={filterSettingsClone.subordinates} 
              onChange={newValue => handleInput('subordinates', newValue)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              label={t('keyword')}
              placeholder={t('meeting:meetingKeyword4Summary')}
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

const dataGridStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    '& .highlight': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold'
    },
    '& .totalRow': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    '& .inBetween': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

function SummaryByCompany(props) {
  const classes = dataGridStyles()
  const { t } = useTranslation('common')

  const renderHighlightCell = (params) => {
    if (!params.value) {
      return (
        <Grid container alignItems="center" className="highlight">
          <span className="mr-1">{params.value}</span>
          <ErrorIcon/>
        </Grid>
      )
    }
    return (
      <span>{params.value}</span>
    )
  }

  const columns = [
    { 
      field: 'year', 
      headerName: t('year'),
      sortable: false,
      width: 150,
    },
    {
      field: 'companyA',
      headerName: 'Company A',
      sortable: false,
      width: 120,
      renderCell: renderHighlightCell
    },
    {
      field: 'companyB',
      headerName: 'Company B',
      sortable: false,
      width: 120,
      renderCell: renderHighlightCell
    },
    {
      field: 'companyC',
      headerName: 'Company C',
      sortable: false,
      width: 120,
      renderCell: renderHighlightCell
    },
    {
      field: 'companyD',
      headerName: 'Company D',
      sortable: false,
      width: 120,
      renderCell: renderHighlightCell
    },
  ]
  
  const rows = [
    { id: 'total', year: 'Total', companyA: 11,  companyB: 8,  companyC: 5,  companyD: 1 },
    { id: '2021Summer', year: '2021 Summer', companyA: 3,  companyB: 2,  companyC: 0,  companyD: 1 },
    { id: 'between2021Summer2021Winter', year: 'In Between', companyA: 1,  companyB: 2,  companyC: 0,  companyD: 0 },
    { id: '2021Winter', year: '2021 Winter', companyA: 1,  companyB: 1,  companyC: 1,  companyD: 0 },
    { id: 'between2021Winter2020Summer', year: 'In Between', companyA: 1,  companyB: 0,  companyC: 1,  companyD: 0 },
    { id: '2020Summer', year: '2020 Summer', companyA: 3,  companyB: 0,  companyC: 1,  companyD: 0 },
    { id: 'between2020Summer2020Winter', year: 'In Between', companyA: 1,  companyB: 2,  companyC: 1,  companyD: 0 },
    { id: '2020Winter', year: '2020 Winter', companyA: 1,  companyB: 1,  companyC: 1,  companyD: 0 },
  ]

  return (
    <>
      <Typography className="my-2" variant="h6" align="center">{t('meetingCountByCompany')}</Typography>
      <DataGrid
        className={classes.root}
        autoHeight hideFooter
        disableSelectionOnClick disableColumnMenu
        showCellRightBorder
        rows={rows}
        columns={columns}
        pageSize={100}
        rowHeight={40}
        getCellClassName={(params) => 
          `${params.id === 'total' ? 'totalRow' : ''} ${params.id.startsWith('between') ? 'inBetween' : ''} ${!params.value ? 'highlight' : ''}`
        }
      />
    </>
  )
}

export default function SummaryCompany() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('summary')))
  }, [])

  const [sortingCriteria, setSortingCriteria] = React.useState({
    year: yearSortingKeys[0],
    companyName: companySortingKeys[0]
  })

  const [filterSettings, setFilterSettings] = React.useState({
    selectedStatuses: {
      ...mapValues(meetingStatuseColors, v => true),
      'no-show': false
    },
    selectedMeetingTypes: mapValues(keyBy(meetingTypes, 'id'), v => true),
    selectRoles: {
      asCreater: true,
      asParticipant: true,
      asSupervisor: true
    },
    subordinates: [],
    keyword: ''
  })
  const [meetings, setMeetings] = React.useState([])
  const [filteredMeetings, setFilteredMeetings] = React.useState([])

  const loadMeetings = async () => {
    try {
      dispatch(setLoading(true))

      const dateFromToDB = dateToDB(filterSettings.dateFrom)
      const dateToToDB = dateToDB(filterSettings.dateTo)
    } catch (e) {
      dispatch(alertError(e.message))
    } finally {
      setTimeout(() => { dispatch(setLoading(false)) }, 500)
    }
  }
  React.useEffect(() => {
    loadMeetings()
  }, [filterSettings])

  const applyFilter = () => {
    setFilteredMeetings(meetings)
  }
  React.useEffect(() => {
    applyFilter()
  }, [meetings])

  return (
    <>
      <DialogActions className="full-width">
        <FilterButton filterSettings={filterSettings} setFilterSettings={setFilterSettings}/>
        <SummaryByCompanySorting sortingCriteria={sortingCriteria} setSortingCriteria={setSortingCriteria}/>
      </DialogActions>
      <NoSsr>
        <Paper elevation={5} className="pt-2">
          <SummaryByCompany meetings={filteredMeetings}/>
        </Paper>
      </NoSsr>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'meeting', 'login']),
  },
})
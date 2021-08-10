import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { setLoading, alertError } from '/store/commonSlice'
import { fakeMeetings } from '/data/meetings'
import { addMonths, isBefore, endOfDay, startOfDay } from 'date-fns'
import { groupBy, cloneDeep, forEach, map, filter, mapValues, keyBy } from 'lodash'
import { formatDate, dateToDB, dateFromUTC, lightenTheColor, getYearOptions } from '/helpers'
import { graphColors } from '/data'
import { meetingStatuseColors, meetingTypes, showcaseSeasons } from '/data/meeting-settings'

import { 
  Paper, Grid, Typography, NoSsr,
  DialogActions, 
} from '@material-ui/core'
import BarChart from '/components/charts/BarChart'
import DoughnutChart from '/components/charts/DoughnutChart'
import TextButton from '/components/TextButton'
import LargeDialog from '/components/LargeDialog'
import MyDatePicker from '/components/MyDatePicker'
import SimpleTable from '/components/SimpleTable'
import CheckBoxGroup from '/components/CheckBoxGroup'
import Legend from '/components/schedule/Legend'
import MyTabs from '/components/MyTabs'
import InternalUserPicker from '/components/InternalUserPicker'

import FilterListIcon from '@material-ui/icons/FilterList'

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
            <Legend label={t('status')} selectedStatuses={filterSettingsClone.selectedStatuses} setSelectedStatuses={(v) => handleInput('selectedStatuses', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:meetingType')} selected={filterSettingsClone.selectedMeetingTypes} onChange={(v) => handleInput('selectedMeetingTypes', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:showcaseYear')} selected={filterSettingsClone.selectedYears} onChange={(v) => handleInput('selectedYears', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:showcaseSeason')} selected={filterSettingsClone.selectedSeasons} onChange={(v) => handleInput('selectedSeasons', v)}/>
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
        </Grid>
      </LargeDialog>
    </>
  )
}

function SummaryByMonth(props) {
  const { t } = useTranslation('common')

  let startDate = cloneDeep(props.dateFrom)
  const endDate = endOfDay(props.dateTo)

  let labels = []
  while (isBefore(startDate, endDate)) {
    labels.push(formatDate(startDate, 'MMMM, yyyy'))
    startDate = addMonths(startDate, 1)
  }
  const groupByMonth = groupBy(props.meetings, it => formatDate(it.startDate, 'MMMM, yyyy'))
  let data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  }
  labels.forEach((month, idx) => {
    data.datasets[0].data.push(groupByMonth[month] && groupByMonth[month].length || 0)
    data.datasets[0].backgroundColor.push(lightenTheColor(graphColors[idx % graphColors.length]))
    data.datasets[0].borderColor.push(graphColors[idx % graphColors.length])
  })

  return (
    <>
      <Typography className="my-2" variant="h6" align="center">{t('meetingCountByMonth')}</Typography>
      <BarChart data={data}/>
    </>
  )
}

function StatusSummary(props) {
  const { t } = useTranslation('common')
  const groupByStatus = groupBy(props.meetings, 'status')
  let summary = {}
  forEach(meetingStatuseColors, (value, status) => {
    summary[status] = groupByStatus[status] && groupByStatus[status].length || 0
  })
  let data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  }
  forEach(summary, (count, status) => {
    const color = meetingStatuseColors[status] && meetingStatuseColors[status].backgroundColor
    data.labels.push(t(status))
    data.datasets[0].data.push(count)
    data.datasets[0].backgroundColor.push(lightenTheColor(color))
    data.datasets[0].borderColor.push(color)
  })

  const tableHeaders = [
    { text: t('status'), key: 'status', component: 'th', scope: 'row' },
    { text: t('count'), key: 'count'}
  ]
  const tableData = [
    { status: t('total'), count: props.meetings && props.meetings.length },
    ...map(summary, (count, status) => {
      return {
        status: t(status),
        count: count
      }
    }),
  ]
  
  return (
    <>
      <Typography className="my-2" variant="h6" align="center">{t('meetingCountByStatus')}</Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={6} className="px-4 py-4">
          <DoughnutChart data={data}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <SimpleTable headers={tableHeaders} data={tableData}/>
        </Grid>
      </Grid>
    </>
  )
}

function NoShowSummary(props) {
  const { t } = useTranslation('common')

  const noShowMeetings = filter(props.meetings, it => it.status === 'no-show')

  let data = {
    labels: ['Company A', 'Company B', 'Company C', 'Company D'],
    datasets: [
      {
        label: '',
        data: [4, 5, 6, 8],
        backgroundColor: [lightenTheColor(graphColors[0]), lightenTheColor(graphColors[1]), lightenTheColor(graphColors[2]), lightenTheColor(graphColors[3])],
        borderColor: [graphColors[0], graphColors[1], graphColors[2], graphColors[3]],
        borderWidth: 1,
      },
    ],
  }

  const tableHeaders = [
    { text: t('company'), key: 'company', component: 'th', scope: 'row' },
    { text: t('count'), key: 'count'}
  ]
  const tableData = [
    { company: t('total'), count: noShowMeetings && noShowMeetings.length },
    { company: 'Company A', count: 4 },
    { company: 'Company B', count: 5 },
    { company: 'Company C', count: 6 },
    { company: 'Company D', count: 8 },
  ]
  
  return (
    <>
      <Typography className="my-2" variant="h6" align="center">{t('noShowMeetings')}</Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={6} className="px-4 py-4">
          <DoughnutChart data={data}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <SimpleTable headers={tableHeaders} data={tableData}/>
        </Grid>
      </Grid>
    </>
  )
}

export default function Summary() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('summary')))
  }, [])

  const tabs = [
    { text: t('byMonth'), value: 'byMonth'},
    { text: t('byStatus'), value: 'byStatus'},
    { text: t('no-show'), value: 'no-show'},
  ]
  const [currentTab, setCurrentTab] = React.useState(tabs[0].value)

  const [filterSettings, setFilterSettings] = React.useState({
    dateFrom: startOfDay(addMonths(new Date(), -3)),
    dateTo: endOfDay(addMonths(new Date(), 3)),
    selectedStatuses: mapValues(meetingStatuseColors, v => true),
    selectedMeetingTypes: mapValues(keyBy(meetingTypes, 'id'), v => true),
    selectRoles: {
      asCreater: true,
      asParticipant: true,
      asSupervisor: true
    },
    selectedYears: mapValues(keyBy(getYearOptions(), it => it), v => true),
    selectedSeasons: mapValues(keyBy(showcaseSeasons, 'id'), v => true),
    subordinates: [],
  })
  const [meetings, setMeetings] = React.useState([])
  const [filteredMeetings, setFilteredMeetings] = React.useState([])

  const loadMeetings = async () => {
    try {
      dispatch(setLoading(true))

      const dateFromToDB = dateToDB(filterSettings.dateFrom)
      const dateToToDB = dateToDB(filterSettings.dateTo)

      setMeetings(fakeMeetings.map(it => {
        return {
          ...it,
          startDate: dateFromUTC(it.startDate),
          endDate: dateFromUTC(it.endDate),
        }
      }))
    } catch (e) {
      dispatch(alertError(e.message))
    } finally {
      setTimeout(() => { dispatch(setLoading(false)) }, 500)
    }
  }
  React.useEffect(() => {
    loadMeetings()
  }, [filterSettings.dateFrom, filterSettings.dateTo])

  const applyFilter = () => {
    setFilteredMeetings(meetings)
  }
  React.useEffect(() => {
    applyFilter()
  }, [meetings])

  return (
    <>
      <DialogActions className="full-width">
        <FilterButton filterSettings={filterSettings} setFilterSettings={setFilterSettings} currentTab={currentTab}/>
      </DialogActions>
      <NoSsr>
        <Paper elevation={5} className="px-4 pt-2 pb-4">
          <MyTabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={tabs}/>
          {currentTab === 'byMonth' && <SummaryByMonth meetings={filteredMeetings} dateFrom={filterSettings.dateFrom} dateTo={filterSettings.dateTo}/>}
          {currentTab === 'byStatus' && <StatusSummary meetings={filteredMeetings}/>}
          {currentTab === 'no-show' && <NoShowSummary meetings={filteredMeetings}/>}
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
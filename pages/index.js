import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { dateToDB, dateFromUTC, getFromNow } from '/helpers'
import { setLoading, alertError } from '/store/commonSlice'
import { mapValues, forEach, filter, map, sum, values } from 'lodash'
import { meetingStatuseColors } from '/data/meeting-settings'
import { generateMeetings } from '/data/generate'
import { startOfDay, endOfDay } from 'date-fns'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import classNames from 'clsx'
import IconButton from '/components/IconButton'
import { fakeToDos } from '/data'

import {
  NoSsr, Grid, Paper, Typography, Select, DialogActions,
  Accordion, AccordionSummary
} from '@material-ui/core'
import MyMenuItem from '/components/MyMenuItem'
import DaySchedule from '/components/schedule/DaySchedule'
import Legend from '/components/schedule/Legend'
import DoughnutChart from '/components/charts/DoughnutChart'
import NewMeetingButton from '/components/meeting/NewMeetingButton'
import BoxButton from '/components/BoxButton'
import TextButton from '/components/TextButton'
import IconDropdownMenu from '/components/IconDropdownMenu'

import DateRangeIcon from '@material-ui/icons/DateRange'
import RateReviewIcon from '@material-ui/icons/RateReview'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SortIcon from '@material-ui/icons/Sort'
import ErrorIcon from '@material-ui/icons/Error'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  centerBox: {
    width: '80%',
    margin: 'auto'
  },
  dateText: {
    color: theme.palette.greyColor.main
  }
}))

function Scheduler(props) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const classes = useStyles()

  const today = new Date()
  const [currentDate, setCurrentDate] = React.useState(today)
  const [meetings, setMeetings] = React.useState([])
  const [filteredMeetings, setFilteredMeetings] = React.useState([])
  const [statusSummary, setStatusSummary] = React.useState({})
  const [chartData, setChartData] = React.useState({})
  const [selectedStatuses, setSelectedStatuses] = React.useState(mapValues(meetingStatuseColors, v => true))

  React.useEffect(() => {
    try {
      dispatch(setLoading(true))

      const currentDateToDB = dateToDB(currentDate)
      const result = generateMeetings(startOfDay(currentDate), endOfDay(currentDate), t)
      setMeetings(result.map(it => {
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
  }, [currentDate])

  React.useEffect(() => {
    setFilteredMeetings(filter(meetings, it => selectedStatuses[it.status]))
  }, [meetings, selectedStatuses])

  React.useEffect(() => {
    let newStatusSummary = mapValues(meetingStatuseColors, v => 0)
    forEach(meetings, it => {
      newStatusSummary[it.status] += 1
    })
    setStatusSummary(newStatusSummary)
  }, [meetings])

  React.useEffect(() => {
    let newChartData = {
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
    forEach(statusSummary, (count, status) => {
      if (!count || !selectedStatuses[status]) return
      const color = meetingStatuseColors[status] && meetingStatuseColors[status].backgroundColor
      newChartData.labels.push(t(status))
      newChartData.datasets[0].data.push(count)
      newChartData.datasets[0].backgroundColor.push(color)
      newChartData.datasets[0].borderColor.push(color)
    })
    setChartData(newChartData)
  }, [statusSummary, selectedStatuses])
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {   
      legend: {
        display: false
      },
    }
  }

  return (
    <Paper elevation={5}>
      <Grid container>
        <Grid item xs={12} sm={6} style={{height: 'calc(100vh - 84px)', overflow: 'auto'}}>
          <DaySchedule meetings={filteredMeetings} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
        </Grid>
        <Grid item xs={12} sm={6} container className="px-2">
          <Grid item className={classNames(classes.centerBox, 'py-2')}>
            <DoughnutChart data={chartData} options={chartOptions} height="200px" width="200px"/>
          </Grid>
          <Grid item className={classes.centerBox}>
            <Legend
              direction="column"
              selectedStatuses={selectedStatuses} 
              setSelectedStatuses={setSelectedStatuses}
              showCount counts={statusSummary} 
            />
          </Grid>
          <Grid item container className={classNames(classes.centerBox, 'py-2')}>
            <NewMeetingButton box/>
            <BoxButton to="/schedule" variant="outlined" style={{width: '100%'}} className="my-2">
              <DateRangeIcon className="mr-1"/>{t('schedule')}
            </BoxButton>
            <BoxButton to="/new-note" variant="outlined" style={{width: '100%'}}>
              <RateReviewIcon className="mr-1"/>{t('newNote')}
            </BoxButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

function ShortSummary(props) {
  const { t } = useTranslation('common')
  const theme = useTheme()

  const views = ['tomorrow', 'thisWeek', 'next7Days', 'thisMonth', 'next30Days']
  const [currentView, setCurrentView] = React.useState(views[0])

  const [chartData, setChartData] = React.useState({})
  const [statusSummary, setStatusSummary] = React.useState({})
  React.useEffect(() => {
    let newStatusSummary = {}
    let newChartData = {
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
    forEach(meetingStatuseColors, (value, status) => {
      const count = Math.floor(Math.random() * 4)
      newStatusSummary[status] = count
      newChartData.labels.push(t(status))
      newChartData.datasets[0].data.push(count)
      const color = meetingStatuseColors[status] && meetingStatuseColors[status].backgroundColor
      newChartData.datasets[0].backgroundColor.push(color)
      newChartData.datasets[0].borderColor.push(color)
    })
    setStatusSummary(newStatusSummary)
    setChartData(newChartData)
  }, [currentView])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
    }
  }

  const LegendNCount = (item) => {
    const color = meetingStatuseColors[item.status] && meetingStatuseColors[item.status].backgroundColor || theme.palette.primary.main
    return (
      <Grid container alignItems="center" className="my-1">
        <div style={{backgroundColor: color, width: 31, height: 19}} className="MuiPaper-rounded"/>
        <span className="ml-2">{t(item.status) || '-'}</span>
        <span>: {item.count || 0}</span>
      </Grid>
    )
  }

  return (
    <Paper elevation={5} className="pt-1">
      <Grid container alignItems="center" spacing={2} className="pl-4">
        <Grid item xs>
          <Typography variant="h6">{t('summary')}</Typography>
        </Grid>
        <Grid item>
          <Select
            value={currentView}
            onChange={(event) => setCurrentView(event.target.value)}
          >
            {views.map(view => <MyMenuItem key={'views'+view} value={view}>{t(view)}</MyMenuItem>)}
          </Select>
        </Grid>
        <Grid item>
          <IconDropdownMenu
            icon={<MoreVertIcon/>}
            items={[
              { to: '/summary', text: t('more') + ' ...'},
              { to: '/summary/company', text: t('byCompany')}
            ]}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={2} className="py-2 px-4">
        <Grid item xs={12} sm={7}>
          <DoughnutChart data={chartData} options={chartOptions} height="250px" width="250px"/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" className="my-1">
            <span>{t('total')}</span>
            <span>: {sum(values(statusSummary)) || 0}</span>
          </Typography>
          {map(statusSummary, (count, status) => 
            <LegendNCount key={'legend'+status} status={status} count={count || 0}/>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

function ToDoList(props) {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const [descending, setDescending] = React.useState(true)

  const ToDoCard = (item) => {
    return (
      <Accordion elevation={5}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ErrorIcon color="secondary"/>
            </Grid>
            <Grid item xs className="bold">
              {item.title || '-'}
            </Grid>
            <Grid item className={classes.dateText}>
              {getFromNow(item.date)}
            </Grid>
          </Grid>
        </AccordionSummary>
        <>
          <div className="px-4 my-1">
            {item.message || '-'}
          </div>
          <DialogActions>
            <TextButton color="secondary">{t('ignore')}</TextButton>
            <TextButton color="primary">{t('viewMeeting')}</TextButton>
            <BoxButton>{t('upload')}</BoxButton>
          </DialogActions>
        </>
      </Accordion>
    )
  }

  return (
    <>
      <Grid container alignItems="center" spacing={2} className="px-1 mt-1">
        <Grid item xs>
          <Typography variant="h6">{t('toDoReminder')}</Typography>
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={() => setDescending(!descending)}><SortIcon/></IconButton>
        </Grid>
      </Grid>
      {fakeToDos.map((toDo, idx) =>
        <div key={'toDo'+idx} className={idx === 0 ? '' : 'mt-2'}>
          <ToDoCard {...toDo}/>
        </div>
      )}
    </>
  )
}

export default function Home() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('home')))
  }, [])

  return (
    <NoSsr>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Scheduler/>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container>
            <Grid item xs={12}>
              <ShortSummary/>
            </Grid>
            <Grid item xs={12}>
              <ToDoList/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NoSsr>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'meeting']),
  },
})
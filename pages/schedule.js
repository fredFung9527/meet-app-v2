import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle } from '/store/commonSlice'
import { mapValues, keyBy } from 'lodash'
import { meetingStatuseColors, meetingTypes, showcaseSeasons } from '/data/meeting-settings'
import { fakeMeetings } from '/data/meetings'
import { startOfMonth, endOfMonth, isBefore, isAfter } from 'date-fns'
import { setLoading, alertError } from '/store/commonSlice'
import { dateToDB, dateFromUTC, getYearOptions } from '/helpers'

import Legend from '/components/schedule/Legend'
import Calendar from '/components/schedule/Calendar'
import NewMeetingButton from '/components/meeting/NewMeetingButton'
import MeetingFilterButton from '/components/meeting/Filter'
import { 
  DialogActions, NoSsr
} from '@material-ui/core'

export default function Schedule() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('schedule')))
  }, [])

  const today = new Date()
  const [currentDate, setCurrentDate] = React.useState(today)
  const [dataRange, setDataRange] = React.useState({
    startDate: startOfMonth(today),
    endDate: endOfMonth(today)
  })
  const [meetings, setMeetings] = React.useState([])
  const [filteredMeetings, setFilteredMeetings] = React.useState([])

  React.useEffect(() => {
    if (isBefore(currentDate, dataRange.startDate) || isAfter(currentDate, dataRange.endDate)) {
      setDataRange({
        startDate: startOfMonth(currentDate),
        endDate: endOfMonth(currentDate)
      })
    }
  }, [currentDate])
  
  const loadMeetings = async () => {
    try {
      dispatch(setLoading(true))

      const startDateToDB = dateToDB(dataRange.startDate)
      const endDateToDB = dateToDB(dataRange.endDate)

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
  }, [dataRange])

  const applyFilter = () => {
    setFilteredMeetings(meetings)
  }
  React.useEffect(() => {
    applyFilter()
  }, [meetings])

  const [filterSettings, setFilterSettings] = React.useState({
    selectedStatuses: mapValues(meetingStatuseColors, v => true),
    selectedMeetingTypes: mapValues(keyBy(meetingTypes, 'id'), v => true),
    selectRoles: {
      asCreater: true,
      asParticipant: true,
      asSupervisor: true
    },
    selectedYears: mapValues(keyBy(getYearOptions(), it => it), v => true),
    selectedSeasons: mapValues(keyBy(showcaseSeasons, 'id'), v => true),
    keyword: '',
    subordinates: []
  })
  const setSelectedStatuses = (v) => {
    setFilterSettings({...filterSettings, selectedStatuses: v})
  }
  
  return (
    <>
      <DialogActions>
        <NewMeetingButton/>
        <MeetingFilterButton filterSettings={filterSettings} setFilterSettings={setFilterSettings}/>
      </DialogActions>
      <NoSsr>
        <Calendar meetings={filteredMeetings} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
      </NoSsr>
      <div className="mt-2">
        <Legend selectedStatuses={filterSettings.selectedStatuses} setSelectedStatuses={setSelectedStatuses}/>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'meeting', 'login']),
  },
})
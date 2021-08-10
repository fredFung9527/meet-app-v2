import React from 'react'
import { ViewState } from '@devexpress/dx-react-scheduler'
import { useTranslation } from 'next-i18next'
import { getTimeLocaleString } from '/helpers'

import {
  Paper, Hidden,
  Select,
} from '@material-ui/core'
import MyMenuItem from '/components/MyMenuItem'
import {
  Scheduler, MonthView, 
  Toolbar, DayView, WeekView, DateNavigator,
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui'
import MyRadioGroup from '../MyRadioGroup'
import MeetingCard from './MeetingCard'
import MeetingCardTooltip from './MeetingCardTooltip'
import MeetingStatusColor from './MeetingStatusColor'

function MyMonthView(props) {
  const MonthCell = React.useCallback(
    ({ startDate, ...restProps }) => {
      return (
        <MonthView.TimeTableCell
          {...restProps}
          startDate={startDate}
          onClick={() => {props.setCurrentDate(startDate);props.setCurrentView('Day')}}
          className="pointer"
        />
      );
    },
    [props.setCurrentDate, props.setCurrentView]
  )

  return (
    <MonthView timeTableCellComponent={MonthCell}/>
  )
}

function MyToolbar(props) {
  const { t } = useTranslation('common')
  const views = [{id: 'Month', text: t('month')}, {id: 'Week', text: t('week')}, {id: 'Day', text: t('day')}]

  const RootBar = React.useCallback(
    (toolbarProps) => {
      return (
        <Toolbar.Root {...toolbarProps}>
          {toolbarProps.children}
          <Hidden only="xs">
            <MyRadioGroup
              row
              value={props.currentView}
              onChange={(event) => props.setCurrentView(event.target.value)}
              options={views}
            />
          </Hidden>
          <Hidden smUp>
            <Select
              value={props.currentView}
              onChange={(event) => props.setCurrentView(event.target.value)}
            >
              {views.map(it => <MyMenuItem key={'xs'+it.id} value={it.id}>{it.text}</MyMenuItem>)}
            </Select>
          </Hidden>
        </Toolbar.Root>
      )
    },
    [props.currentView]
  )

  return (
    <Toolbar rootComponent={RootBar}/>
  )
}

export default function Calendar(props) {
  const [currentView, setCurrentView] = React.useState('Month')
  const propsForChildren = {
    currentDate: props.currentDate,
    setCurrentDate: props.setCurrentDate,
    currentView: currentView,
    setCurrentView: setCurrentView
  }

  return (
    <>
      <Paper elevation={5}>
        <Scheduler 
          data={props.meetings}
          locale={getTimeLocaleString()}
        >
          <ViewState
            currentDate={props.currentDate}
            currentViewName={currentView}
            onCurrentViewNameChange={setCurrentView}
            onCurrentDateChange={props.setCurrentDate}
          />
          <MyMonthView {...propsForChildren}/>
          <WeekView/>
          <DayView/>
          <MeetingCard {...propsForChildren}/>
          <MeetingCardTooltip/>
          <CurrentTimeIndicator shadePreviousCells/>
          <MyToolbar {...propsForChildren}/>
          <DateNavigator/>
          <MeetingStatusColor/>
        </Scheduler>
      </Paper>
    </>
  )
}
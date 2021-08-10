import React from 'react'
import { ViewState } from '@devexpress/dx-react-scheduler'
import { getTimeLocaleString } from '/helpers'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "clsx"

import {
  Scheduler, Toolbar, DayView, DateNavigator,
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui'
import MeetingCard from './MeetingCard'
import MeetingCardTooltip from './MeetingCardTooltip'
import MeetingStatusColor from './MeetingStatusColor'

const useStyles = makeStyles(theme => ({
  line: {
    height: "2px",
    width: "100%",
    transform: "translate(0, -1px)"
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: "50%",
    transform: "translate(-50%, -50%)"
  },
  nowIndicator: {
    position: "absolute",
    left: 0,
    top: ({ top }) => top,
    background: theme.palette.secondary.main,
    zIndex: 1
  }
}))

export default function DaySchedule(props) {
  const indicatorRef = React.useRef(null)
  const Indicator = ({ top, ...restProps }) => {
    const classes = useStyles({ top })

    return (
      <div {...restProps} ref={indicatorRef}>
        <div className={classNames(classes.nowIndicator, classes.circle)} />
        <div className={classNames(classes.nowIndicator, classes.line)} />
      </div>
    );
  }
  React.useEffect(() => {
    indicatorRef && indicatorRef.current && indicatorRef.current.scrollIntoView({ block: "center" })
  }, [])

  return (
    <Scheduler 
      data={props.meetings}
      locale={getTimeLocaleString()}
    >
      <ViewState
        currentDate={props.currentDate}
        onCurrentDateChange={props.setCurrentDate}
      />
      <DayView/>
      <MeetingCard/>
      <MeetingCardTooltip/>
      <CurrentTimeIndicator indicatorComponent={Indicator} shadePreviousCells/>
      <Toolbar/>
      <DateNavigator/>
      <MeetingStatusColor/>
    </Scheduler>
  )
}
import { addDays, addHours, isBefore } from 'date-fns'
import { keys } from 'lodash'
import { meetingTypes, meetingStatuseColors } from './meeting-settings'

export function generateMeetings(startDate, endDate, t, dayStep=1) {
  try {
    let result = []
    let current = startDate
    const meetingStatuses = keys(meetingStatuseColors)
    while (isBefore(current, endDate)) {
      const randomMeetingCount = Math.floor(Math.random() * 4)
      Array(randomMeetingCount).fill(0).forEach(idx => {
        const meetingTypeIdx = Math.floor(Math.random() * meetingTypes.length)
        const statusIdx = Math.floor(Math.random() * meetingStatuses.length)
        const status = meetingStatuses[statusIdx]
        const startHour = Math.floor(Math.random() * 24)
        result.push({
          title: t ? t(meetingTypes[meetingTypeIdx].id) : meetingTypes[meetingTypeIdx].id,
          meetingType: meetingTypes[meetingTypeIdx].id,
          status: status,
          startDate: addHours(current, startHour),
          endDate: addHours(current, startHour+1),
          ...meetingStatuseColors[status]
        })
      })
      current = addDays(current, dayStep)
    }
    return result
  } catch (e) {
    console.log('Generate meetings error: ' + e.message)
    return []
  }
}

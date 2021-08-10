import { useTranslation } from 'next-i18next'
import { map } from 'lodash'
import { meetingStatuseColors } from '/data/meeting-settings'

import { Resources } from '@devexpress/dx-react-scheduler-material-ui'

export default function MeetingStatusColor(props) {
  const { t } = useTranslation('common')
  const transformedMeetingStatuseColors = [
      {
        fieldName: 'status',
        instances: map(meetingStatuseColors, (value, key) => {
          return {
            id: key,
            text: t(key),
            color: value.backgroundColor
          }
        })
      },
    ]

  return (
    <Resources data={transformedMeetingStatuseColors} mainResourceName="status"/>
  )
}
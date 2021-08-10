import { meetingStatuseColors } from '/data/meeting-settings'
import { mapValues } from 'lodash'

import CheckBoxGroup from '../CheckBoxGroup'

export default function Legend(props) {
  return (
    <CheckBoxGroup
      {...props}
      selected={props.selectedStatuses}
      onChange={props.setSelectedStatuses}
      colors={mapValues(meetingStatuseColors, v => v.backgroundColor)}
    />
  )
}
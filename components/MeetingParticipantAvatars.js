import { useTheme } from '@material-ui/core/styles'
import graphColors from '/data/graph-colors'
import { useSelector } from 'react-redux'
import { concat, map, find } from 'lodash'
import { internalParticipants } from '/data/meeting-settings'
import { withStyles } from '@material-ui/core/styles'

import {
  Badge, Typography, Grid, Tooltip
} from '@material-ui/core'

const SelectedIndicator = withStyles((theme) => ({
  badge: {
    left: '50%',
    bottom: -8,
    zIndex: 10
  },
}))(Badge)

function AvatarItem(props) {
  const theme = useTheme()

  return (
    <Tooltip title={props.name || 'All'}>
      <SelectedIndicator 
        variant="dot" 
        invisible={!props.selected} 
        color="primary" 
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      >
        <Badge
          color="secondary" overlap="circular" max={9} 
          badgeContent={props.count} invisible={!props.count}
        >
          <div
            className="pointer .MuiTabs-indicator"
            style={{
              height: 55, 
              width: 55,
              backgroundColor: props.backgroundColor || theme.palette.primary.main,
              color: 'white',
              borderStyle: props.borderStyle || 'solid',
              borderWidth: 2,
              borderRadius: 50,
            }}
          >
            <Grid container justifyContent="center" alignItems="center" className="full-height">
              <Typography>{props.children || '-'}</Typography>
            </Grid>
          </div>
        </Badge>
      </SelectedIndicator>
    </Tooltip>
  )
}

export default function MeetingParticipantAvatars(props) {
  const meetingOfCurrentNote = useSelector((state) => state.common.meetingOfCurrentNote)
  if (!meetingOfCurrentNote || !meetingOfCurrentNote._id) return <div/>

  const participants = map(concat(meetingOfCurrentNote.internalParticipants, meetingOfCurrentNote.otherParticipants), it => {
    if (typeof it === 'string') {
      const theParticipant = find(internalParticipants, participant => participant.userID === it)
      return { 
        ...theParticipant, 
        participantType: 'internal',
        name: theParticipant.e_name,
        id: theParticipant.userID
      }
    } else {
      return { 
        ...it, 
        participantType: 'other',
        name: it.name || it.email,
        id: it.email
      }
    }
  })

  return (
    <Grid container>
      <div onClick={() => props.onChange('all')} className="py-2">
        <AvatarItem 
          selected={props.value === 'all'}
          count={props.coutMapping && props.coutMapping['all']}
        >
          All
        </AvatarItem>
      </div>
      {participants.map((participant, idx) =>
        <div key={idx} style={{marginLeft: -8, zIndex: idx + 1}} className="py-2" onClick={() => props.onChange(participant.id)}>
          <AvatarItem 
            {...participant} 
            backgroundColor={graphColors[idx % graphColors.length]}
            selected={props.value === participant.id}
            count={props.coutMapping && props.coutMapping[participant.id]}
          >
            { participant.name ? participant.name[0] + participant.name[1] : '-' }
          </AvatarItem>
        </div>
      )}
    </Grid>
  )
}
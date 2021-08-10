import { meetingTypes } from '/data/meeting-settings'
import { useTranslation } from 'next-i18next'

import { Paper, Grid, Typography } from '@material-ui/core'
import FlatIcon from '/components/FlatIcon'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'

export default function NewMeetingStep0(props) {
  const { t } = useTranslation(['common'])

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={9} md={6}>
        {meetingTypes.map(type => (
          <Paper 
            key={type.id} 
            elevation={5} 
            className="px-2 py-4 my-2 pointer"
            onClick={() => props.onClick(type.id)}
          >
            <Grid container alignItems="center">
              {type.icon && <FlatIcon src={type.icon}/>}
              <Grid item xs className="mx-2"><Typography variant="h6">{t(type.id)}</Typography></Grid>
              <ChevronRightIcon/>
            </Grid>
          </Paper>
        ))}
      </Grid>
    </Grid>
  )
}
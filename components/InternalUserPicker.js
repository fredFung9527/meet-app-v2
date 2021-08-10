import React from 'react'
import { internalParticipants } from '/data/meeting-settings'
import { omit, find, map } from 'lodash'
import { useTranslation } from 'next-i18next'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextInput from './TextInput'
import { Chip, Grid } from '@material-ui/core'
import SimpleDialog from './SimpleDialog'

export default function InternalUserPicker(props) {
  const { t } = useTranslation(['meeting', 'login'])

  const [open, setOpen] = React.useState(false)
  const [dialogObject, setDialogObject] = React.useState({})

  return (
    <>
      <Autocomplete
        value={props.value}
        onChange={(event, newValue) => {
          props.onChange(map(newValue, it => it.userID || it))
        }}
        autoHighlight
        multiple
        options={internalParticipants}
        getOptionLabel={(option) => option.e_name}
        renderInput={(params) => <TextInput {...params} {...omit(props, 'value', 'onChange')}/>}
        noOptionsText={t('noOptions')}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const theUser = find(internalParticipants, it => it.userID === option)
            return (
              <Chip
                {...getTagProps({ index })}
                key={theUser.e_name}
                label={theUser.e_name}
                onClick={() => {setDialogObject(theUser);setOpen(true)}}
              />
            )
          })
        }
        getOptionSelected={(option, value) => option.userID && option.userID === value}
      />
      <SimpleDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        title={dialogObject.e_name}
        content={
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput disabled label={t('login:email')} value={dialogObject.email}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput disabled label={t('login:userID')} value={dialogObject.userID}/>
            </Grid>
          </Grid>
        }
        noConfirm
      />
    </>
  )
}
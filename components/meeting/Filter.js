import React from 'react'
import { useTranslation } from 'next-i18next'
import { cloneDeep } from 'lodash'

import TextButton from '/components/TextButton'
import LargeDialog from '../LargeDialog'
import { 
  Grid, InputAdornment
} from '@material-ui/core'
import TextInput from '../TextInput'
import Legend from '/components/schedule/Legend'
import CheckBoxGroup from '../CheckBoxGroup'
import InternalUserPicker from '../InternalUserPicker'

import FilterListIcon from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'

export default function MeetingFilterButton(props) {
  const { t } = useTranslation(['common', 'meeting'])
  const [open, setOpen] = React.useState(false)

  const [filterSettingsClone, setFilterSettingsClone] = React.useState(cloneDeep(props.filterSettings))
  const setSelectedStatuses = (v) => {
    setFilterSettingsClone({...filterSettingsClone, selectedStatuses: v})
  }
  const handleInput = (key, value) => {
    setFilterSettingsClone({...filterSettingsClone, [key]: value})
  }

  return (
    <>
      <TextButton color="primary" onClick={() => setOpen(true)}>
        <FilterListIcon className="mr-1"/>{t('filter')}
      </TextButton>
      <LargeDialog
        onClose={() => {setOpen(false);props.setFilterSettings(filterSettingsClone)}} 
        open={open}
        title={t('filter')}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Legend label={t('status')} selectedStatuses={filterSettingsClone.selectedStatuses} setSelectedStatuses={setSelectedStatuses}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:meetingType')} selected={filterSettingsClone.selectedMeetingTypes} onChange={(v) => handleInput('selectedMeetingTypes', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:showcaseYear')} selected={filterSettingsClone.selectedYears} onChange={(v) => handleInput('selectedYears', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('meeting:showcaseSeason')} selected={filterSettingsClone.selectedSeasons} onChange={(v) => handleInput('selectedSeasons', v)}/>
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup label={t('role')} selected={filterSettingsClone.selectRoles} onChange={(v) => handleInput('selectRoles', v)}/>
          </Grid>
          <Grid item xs={12}>
            <InternalUserPicker
              label={t('subordinates')}
              value={filterSettingsClone.subordinates} 
              onChange={newValue => handleInput('subordinates', newValue)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              label={t('keyword')}
              placeholder={t('meeting:meetingKeyword')}
              value={filterSettingsClone.keyword}
              onChange={(event) => handleInput('keyword', event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </LargeDialog>
    </>
  )
}
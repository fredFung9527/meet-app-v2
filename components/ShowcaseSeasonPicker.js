
import React from 'react'
import { useTranslation } from 'next-i18next'
import { omit, find } from 'lodash'
import { showcaseSeasons } from '/data/meeting-settings'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextInput from './TextInput'

export default function ShowcaseSeasonPicker(props) {
  const { t } = useTranslation('meeting')
  const options = showcaseSeasons.map(it => it.id)

  React.useEffect(() => {
    if (props.optional) {
      props.onChange(null)
      return
    }

    let currentSeason = showcaseSeasons[0].id || null
    try {
      const currentMonth = new Date().getMonth() + 1
      currentSeason = (find(showcaseSeasons, season => currentMonth >= season.startMonth)).id
    } catch (e) { console.log('Get current season error: ' + e.message) }
    if (!props.value) props.onChange(currentSeason || null)
  }, [])

  return (
    <Autocomplete
      autoHighlight
      options={options}
      getOptionLabel={(option) => option}
      value={props.value}
      onChange={(event, newValue) => props.onChange(newValue)}
      renderInput={(params) => <TextInput {...params} {...omit(props, 'optional')} label={t('showcaseSeason')}/>}
      noOptionsText={t('noOptions')}
      disableClearable={!props.optional}
    />
  )
}
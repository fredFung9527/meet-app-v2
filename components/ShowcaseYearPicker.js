
import React from 'react'
import { useTranslation } from 'next-i18next'
import { getYearOptions } from '/helpers'
import { omit } from 'lodash'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextInput from './TextInput'

export default function ShowcaseYearPicker(props) {
  const { t } = useTranslation('meeting')
  const options = getYearOptions()

  React.useEffect(() => {
    if (props.optional) {
      props.onChange(null)
      return
    }
    if (!props.value) props.onChange(options[0] || null)
  }, [])

  return (
    <Autocomplete
      autoHighlight
      options={options}
      getOptionLabel={(option) => option}
      value={props.value}
      onChange={(event, newValue) => props.onChange(newValue)}
      renderInput={(params) => <TextInput {...params} {...omit(props, 'optional')} label={t('showcaseYear')}/>}
      noOptionsText={t('noOptions')}
      disableClearable={!props.optional}
    />
  )
}
import { marketCodes } from '/data/meeting-settings'
import { omit } from 'lodash'
import { useTranslation } from 'next-i18next'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import TextInput from './TextInput'

const filter = createFilterOptions()

export default function MarketCodePicker(props) {
  const { t } = useTranslation('meeting')

  return (
    <Autocomplete
      autoHighlight
      freeSolo
      value={props.value}
      onChange={(event, newValue) => props.onChange(newValue)}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            marketCode: `${t('confirmCompany')}: "${params.inputValue}"`,
          });
        }
        return filtered
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={marketCodes}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        }
        if (option.inputValue) {
          return option.inputValue
        }
        return option.marketCode
      }}
      renderOption={(option) => option.marketCode}
      renderInput={(params) => <TextInput {...params} {...omit(props, 'value', 'onChange')} label={props.label}/>}
      noOptionsText={t('noOptions')}
      getOptionSelected={(option, value) => option.marketCode && option.marketCode === value.marketCode}
    />
  )
}
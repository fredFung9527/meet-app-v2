import { useTranslation } from 'next-i18next'
import { mapValues, keys, some, sum, values } from 'lodash'

import {
  Grid, FormControl, FormLabel, FormGroup
} from '@material-ui/core'
import CheckBox from './CheckBox'

export default function CheckBoxGroup(props) {
  const { t } = useTranslation('common')

  const list = keys(props.selected)
  const handleCheck = (event) => {
    if (event.target.name === 'all') {
      props.onChange(mapValues(props.selected, v => event.target.checked))
    } else {
      props.onChange({...props.selected, [event.target.name]: event.target.checked})
    }
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        <Grid container direction={props.direction || 'row'}>
          <Grid item>
            <CheckBox
              name="all" 
              label={t('all') + (props.showCount ? `: ${sum(values(props.counts)) || 0}` : '')}
              checked={some(props.selected, (value, key) => value)}
              onChange={handleCheck}
            />
          </Grid>
          {list.map(key =>
            <Grid item key={'legend'+key}>
              <CheckBox
                name={key} 
                label={t(key) + (props.showCount && props.counts && props.counts[key] !== null ? `: ${props.counts[key] || 0}` : '')}
                checked={props.selected[key]}
                onChange={handleCheck}
                style={{color: props.colors && props.colors[key]}}
              />
            </Grid>
          )}
        </Grid>
      </FormGroup>
    </FormControl>
  )
}
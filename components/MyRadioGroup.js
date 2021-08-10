import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

export default function MyRadioGroup(props) {
  return (
    <FormControl component="fieldset">
      {props.label && <FormLabel component="legend">{props.label}</FormLabel>}
      <RadioGroup {...props} style={{ flexDirection: props.row ? 'row' : 'column' }}>
        {props.options.map((option, idx) => 
          <FormControlLabel key={option.id + idx} value={option.id} control={<Radio />} label={option.text} />
        )}
      </RadioGroup>
    </FormControl>
  )
}
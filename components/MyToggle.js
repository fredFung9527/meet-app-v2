import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'

const MyToggleButton = withStyles((theme) => ({
  selected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: 'white !important'
  }
}))(ToggleButton)

export default function MyToggle(props) {
  return (
    <ToggleButtonGroup
      size="small"
      exclusive={!props.multiple}
      value={props.value}
      onChange={(event, newValue) => props.onChange(newValue)}
    >
      {props.options.map(opiton =>
        <MyToggleButton key={opiton.value} value={opiton.value}>
          {opiton.icon}<span>{opiton.text}</span>
        </MyToggleButton>
      )}
    </ToggleButtonGroup>
  );
}
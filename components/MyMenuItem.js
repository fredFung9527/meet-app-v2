import { withStyles } from '@material-ui/core/styles'

import { MenuItem } from '@material-ui/core'

const PrimaryMenuItem = withStyles((theme) => ({
  selected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: 'white !important'
  },
}))(MenuItem)

export default function MyMenuItem(props) {
  return <PrimaryMenuItem {...props}/>
}
import { IconButton } from '@material-ui/core'
import dynamic from 'next/dynamic'

export default function MyIconButton(props) {
  if (props.to) {
    const Link = dynamic(() => import("next/link"))
    return (
      <Link href={props.to}>
        <a>
        <IconButton {...props}>
          { props.children || '-' }
        </IconButton>
        </a>
      </Link>
    )
  } else {
    return (
      <IconButton {...props}>
        { props.children || '-' }
      </IconButton>
    )
  }
}
import { Button } from '@material-ui/core'
import Link from 'next/link'

export default function TextButton(props) {
  if (props.to) {
    return (
      <Link href={props.to}>
        <a>
          <Button {...props} variant="text">
            { props.children || '-' }
          </Button>
        </a>
      </Link>
    )
  } else {
    return (
      <Button {...props} variant="text">
        { props.children || '-' }
      </Button>
    )
  }
}
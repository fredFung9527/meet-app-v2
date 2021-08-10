import { Button } from '@material-ui/core'
import Link from 'next/link'

export default function BoxButton(props) {
  if (props.to) {
    return (
      <Link href={props.to}>
        <a className="full-width">
          <Button variant="contained" color="primary" {...props}>
            { props.children || '-' }
          </Button>
        </a>
      </Link>
    )
  }
  
  return (
    <Button 
      variant="contained"
      color="primary"
      {...props}
    >
      { props.children || '-' }
    </Button>
  )
}
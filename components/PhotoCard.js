import { makeStyles } from '@material-ui/core/styles'

import Image from 'next/image'
import {
  ImageListItemBar, Badge
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: 'normal'
  },
  titleBar: {
    paddingTop: 10,
    paddingBottom: 10,
    height: 'auto',
    alignItems: 'center'
  },
}))

export default function PhotoCard(props) {
  const classes = useStyles()

  return (
    <Badge
      badgeContent={props.count}
      invisible={!props.count}
      max={9}
      color="primary" 
      style={{position: 'relative', width: '100%', minHeight: 250}} 
      className="pointer"
      onClick={props.onClick}
    >
      <Image 
        src={props.image}
        alt={props.name}
        layout="fill"
        objectFit="contain"
      />
      <ImageListItemBar
        title={props.name}
        classes={{root: classes.titleBar, title: classes.title}}
      />
    </Badge>
  )
}
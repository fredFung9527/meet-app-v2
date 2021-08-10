import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { ImageListItemBar, Grid } from '@material-ui/core'
import IconButton from './IconButton'
import { EditSignatureButton } from './SignatureButton'

import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

export default function SingleLineAttachmentList(props) {
  const classes = useStyles()
  if (!props || !props.files || !props.files.length) return <div/>

  const getFile = (item) => {
    try {
      if (item.type === 'localFile') {
        const type = item.src.type
        if (type.startsWith('image')) {
          return {
            src: URL.createObjectURL(item.src),
            name: item.src.name
          }
        } else if (type.startsWith('video')) {
          return {
            src: '/images/icons/mp4.png',
            name: item.src.name
          }
        } else if (type.startsWith('audio')) {
          return {
            src: '/images/icons/mp3.png',
            name: item.src.name
          }
        } else if (type === 'application/vnd.ms-excel') {
          return {
            src: '/images/icons/xls.png',
            name: item.src.name
          }
        } else if (type === 'text/plain') {
          return {
            src: '/images/icons/txt.png',
            name: item.src.name
          }
        } else if (type === 'application/pdf') {
          return {
            src: '/images/icons/pdf.png',
            name: item.src.name
          }
        }  else if (type === 'application/msword') {
          return {
            src: '/images/icons/doc.png',
            name: item.src.name
          }
        }  else if (type === 'application/vnd.ms-powerpoint') {
          return {
            src: '/images/icons/ppt.png',
            name: item.src.name
          }
        }
      } else if (item.type === 'drawer') {
        return {
          name: 'drawer.jpg',
          src: item.src && item.src.content
        }
      }
      return {
        name: '-',
        src: '/images/icons/file-broken.png'
      }
    } catch (e) {
      console.log("Load local file faile: " + e.message)
      return {
        name: '-',
        src: '/images/icons/file-broken.png'
      }
    }
  }

  return (
    <Grid container spacing={2}>
      {props.files && props.files.map((item, idx) => {
        const file = getFile(item)
        return (
          <Grid item key={idx} xs={6} sm={4} md={3}>
            <div style={{position:'relative'}}>
              <img
                style={{width: '100%', height: 150, objectFit: 'contain'}}
                src={file.src}
                alt={file.name}
              />
              <ImageListItemBar
                title={file.name}
                actionIcon={
                  <>
                    {item.type === 'drawer' && 
                      <EditSignatureButton 
                        className={classes.title} 
                        oldImage={item.src}
                        onChange={(v) => props.onEditDrawder(idx, v)}
                      />
                    }
                    <IconButton
                      onClick={() => props.onRemove(idx)}
                    >
                      <DeleteIcon className={classes.title}/>
                    </IconButton>
                  </>
                }
                classes={{root: classes.titleBar}}
              />
            </div>
          </Grid>
        )
      })}
    </Grid>
  )
}
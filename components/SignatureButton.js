import React from 'react'
import { useTranslation } from 'next-i18next'

import IconButton from './IconButton'
import { Dialog, AppBar, Toolbar, Grid, Typography } from '@material-ui/core'
import SignatureCanvas from 'react-signature-canvas'
import MyColorPicker from './MyColorPicker'

import GestureIcon from '@material-ui/icons/Gesture'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import RestoreIcon from '@material-ui/icons/Restore'

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0])
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight -64])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

export function SignaturePad(props) {
  const { t } = useTranslation(['common'])

  const [drawerPad, setDrawerPad] = React.useState(null)
  const [width, height] = useWindowSize()
  const [color, setColor] = React.useState('#000000')
  const [lastEdit, setLastEdit] = React.useState('')

  const setUpDrawerRef = React.useCallback(ref => {
    if (!ref) return
    setDrawerPad(ref)
  }, [])

  const getImageContent = () => {
    return drawerPad && drawerPad.getCanvas().toDataURL('image/jpg')
  }
  const restoreImageContent = (oldContent, oldWidth, oldHeight) => {
    if (!drawerPad) return
    drawerPad.clear()
    drawerPad.fromDataURL(oldContent, {width: oldWidth || width, height: oldHeight || height})
    setLastEdit('')
  }
  React.useEffect(() => {
    if (!drawerPad || !props.oldImage) return
    restoreImageContent(props.oldImage.content, props.oldImage.width, props.oldImage.height)
  }, [drawerPad])

  const saveNClose = () => {
    props.setOpen(false)
    if (!drawerPad || drawerPad.isEmpty()) return
    props.onChange && props.onChange({
      width: width,
      height: height,
      content: getImageContent()
    })
    setLastEdit('')
  }

  return (
    <Dialog
      fullScreen
      open={props.open} onClose={saveNClose}
    >
      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography variant="h6">{t('drawerPad')}</Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" onClick={() => restoreImageContent(lastEdit)} disabled={!lastEdit.length}><RestoreIcon/></IconButton>
            </Grid>
            <Grid item>
              <MyColorPicker value={color} onChange={setColor}/>
            </Grid>
            <Grid item>
              <IconButton onClick={saveNClose} color="inherit"><CloseIcon/></IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <SignatureCanvas 
        ref={setUpDrawerRef}
        penColor={color}
        canvasProps={{
          width: width,
          height: height
        }}
        onBegin={() => setLastEdit(getImageContent())}
      />
    </Dialog>
  )
}

export function EditSignatureButton(props) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton color={props.color || 'primary'} onClick={() => setOpen(true)}>
        <EditIcon/>
      </IconButton>
      <SignaturePad open={open} setOpen={setOpen} onChange={props.onChange} oldImage={props.oldImage}/>
    </>
  )
}

export default function SignatureButton(props) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton color={props.color || 'primary'} onClick={() => setOpen(true)}>
        <GestureIcon fontSize={props.fontSize || 'large'}/>
      </IconButton>
      <SignaturePad open={open} setOpen={setOpen} onChange={props.onChange}/>
    </>
  )
}
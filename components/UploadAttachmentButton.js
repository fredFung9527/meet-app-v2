import React from 'react'

import IconButton from './IconButton'
import FilePicker from './FilePicker'

import AttachFileIcon from '@material-ui/icons/AttachFile'

export default function UploadAttachmentButton(props) {
  const filePickerRef = React.useRef(null)
  const selectFile = () => {
    filePickerRef.current.click()
  }

  return (
    <>
      <IconButton color={props.color || 'secondary'} onClick={selectFile}>
        <AttachFileIcon fontSize={props.fontSize || 'large'}/>
      </IconButton>
      <FilePicker 
        innerRef={filePickerRef} 
        hidden
        onChange={(files) => props.onChange(files['0'])}
        accept="image/*,video/*,audio/*,.csv,.txt,.pdf,.xlsx,.xls,.doc,.docx,.ppt,.pptx"
      />
    </>
  )
}
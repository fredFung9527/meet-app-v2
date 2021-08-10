import React from 'react'

import PhotoCard from '../PhotoCard'
import DropNoteDialog from './DropNoteDialog'

export default function AlbumCardWithNote(props) {
  const [open, setOpen] = React.useState(false)
  const [totalNotes, setTotalNotes] = React.useState(0)

  return (
    <>
      <PhotoCard image={props.image} name={props.name} onClick={() => setOpen(true)} count={totalNotes}/>
      <DropNoteDialog 
        {...props} 
        open={open} 
        onClose={() => setOpen(false)} 
        noteSlicefield="albumNotes" 
        idName="album"
        setTotalNotes={setTotalNotes}
        inputFields={[
          { key: 'sampleRemark' },
          { key: 'comment', multiline: true },
        ]}
        singleSample
      />
    </>
  )
}
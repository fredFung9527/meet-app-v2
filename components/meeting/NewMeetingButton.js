import React from 'react'
import { useTranslation } from 'next-i18next'

import BoxButton from '/components/BoxButton'
import TextButton from '/components/TextButton'
import NewMeeting from '/pages/new-meeting'
import LargeDialog from '../LargeDialog'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

export default function NewMeetingButton(props) {
  const { t } = useTranslation(['common'])
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {
        props.box ? 
        (
          <BoxButton color="primary" onClick={() => setOpen(true)} className="full-width">
            <AddCircleOutlineIcon className="mr-1"/>{t('newMeeting')}
          </BoxButton>
        ) :
        (
          <TextButton color="primary" onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon className="mr-1"/>{t('newMeeting')}
          </TextButton>
        )
      }
      <LargeDialog
        onClose={() => {setOpen(false)}} 
        open={open}
        title={t('newMeeting')}
      >
        <NewMeeting/>
      </LargeDialog>
    </>
  )
}
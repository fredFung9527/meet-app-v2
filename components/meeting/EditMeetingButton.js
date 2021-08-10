import React from 'react'
import { useTranslation } from 'next-i18next'

import TextButton from '/components/TextButton'
import NewMeetingShowcaseOR from '/components/meeting/ShowcaseOR'
import NewMeetingShowcaseVirtual from '/components/meeting/ShowcaseVirtual'
import NewMeetingCustomerVisit from '/components/meeting/CustomerVisit'
import NewMeetingShowcaseInternal from '/components/meeting/Internal'
import NewMeetingShowcaseOther from '/components/meeting/Other'
import LargeDialog from '../LargeDialog'

import EditIcon from '@material-ui/icons/Edit'

export default function EditMeetingButton(props) {
  const { t } = useTranslation(['common'])
  const [open, setOpen] = React.useState(false)
  const [enoughInformation, setEnoughInformation] = React.useState(false)
  const [showError, setShowError] = React.useState(false)

  const EditComponent = () => {
    switch (props.meeting && props.meeting.meetingType) {
      case 'showcase-or':
        return <NewMeetingShowcaseOR setEnoughInformation={setEnoughInformation} showError={showError}/>
      case 'showcase-virtual':
        return <NewMeetingShowcaseVirtual setEnoughInformation={setEnoughInformation} showError={showError}/>
      case 'customerVisit':
        return <NewMeetingCustomerVisit setEnoughInformation={setEnoughInformation} showError={showError}/>
      case 'internal':
        return <NewMeetingShowcaseInternal setEnoughInformation={setEnoughInformation} showError={showError}/>
      default:
        return <NewMeetingShowcaseOther setEnoughInformation={setEnoughInformation} showError={showError}/>
    }
  }

  return (
    <>
      <TextButton onClick={() => { setOpen(true) }}><EditIcon className="mr-1"/>{t('edit')}</TextButton>
      <LargeDialog
        onClose={() => { setOpen(false) }} 
        open={open}
        title={t('eidtMeeting')}
      >
        <EditComponent/>
      </LargeDialog>
    </>
  )
}
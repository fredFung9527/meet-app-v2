import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setTitle, alertSuccess } from '/store/commonSlice'
import { initMeeting } from '/store/meetingSlice'

import {
  Stepper, Step, StepLabel, DialogActions
} from '@material-ui/core'
import NewMeetingStep0 from '/components/meeting/Step0'
import NewMeetingShowcaseOR from '/components/meeting/ShowcaseOR'
import NewMeetingShowcaseVirtual from '/components/meeting/ShowcaseVirtual'
import NewMeetingCustomerVisit from '/components/meeting/CustomerVisit'
import NewMeetingShowcaseInternal from '/components/meeting/Internal'
import NewMeetingShowcaseOther from '/components/meeting/Other'
import TextButton from '/components/TextButton'
import BoxButton from '/components/BoxButton'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DoneAllIcon from '@material-ui/icons/DoneAll'

function NewMeetingStepper(props) {
  const { t } = useTranslation(['meeting'])

  const steps = ['selectMeetingType', 'inputInformation', 'finish']

  return (
    <Stepper activeStep={props.activeStep}>
      {steps.map(step => 
        <Step key={step}>
          <StepLabel>{t(step)}</StepLabel>
        </Step>
      )}
    </Stepper>
  )
}

export default function NewMeeting() {
  const { t } = useTranslation(['common'])
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle(t('newMeeting')))
  }, [])

  const [activeStep, setActiveStep] = React.useState(0)
  const [meetingType, setMeetingType] = React.useState('')
  const [enoughInformation, setEnoughInformation] = React.useState(false)
  const [showError, setShowError] = React.useState(false)

  const goStep0 = () => {
    setActiveStep(0)
    setShowError(false)
    dispatch(setTitle(t('newMeeting')))
  }

  const handleCreate = () => {
    setShowError(true)
    if (!enoughInformation) return
    dispatch(alertSuccess(t('created')))
    dispatch(initMeeting())
    goStep0()
  }

  const step1Component = () => {
    switch (meetingType) {
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
      <NewMeetingStepper activeStep={activeStep}/>
      {activeStep === 0 ?
        (
          <NewMeetingStep0 onClick={(type) => {setMeetingType(type);setActiveStep(1);dispatch(setTitle(t(type)))}}/>
        ) :
        (
          <>
            {step1Component()}
            <DialogActions className="mt-2">
              <TextButton onClick={goStep0}>
                <ChevronLeftIcon/>
                {t('back')}
              </TextButton>
              <BoxButton onClick={handleCreate}>
                <DoneAllIcon className="mr-1"/>
                {t('confirm')}
              </BoxButton>
            </DialogActions>
          </>
        )
      }
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'meeting', 'login']),
  },
})
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setList } from '/store/noteSlice'
import { alertSuccess } from '/store/commonSlice'
import { indexOf } from 'lodash'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import BoxButton from '../BoxButton'
import SimpleDialog from '../SimpleDialog'
import TextInput from '../TextInput'

export default function NewProjectButton(props) {
  const { t } = useTranslation('note')
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.note.projects)

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [firstTrial, setFirstTrial] = React.useState(true)
  const [helperText, setHelperText] = React.useState('')

  const confirmToAdd = () => {
    setFirstTrial(false)
    if (helperText.length) return
    dispatch(setList({
      target: 'projects',
      list: [...projects, title]
    }))
    dispatch(alertSuccess(t('addedToProject')))
    setOpen(false)
  }

  const startAddProject = () => {
    setTitle('')
    setFirstTrial(true)
    setOpen(true)
  }

  React.useEffect(() => {
    if (!title) {
      setHelperText(t('needProjectName'))
      return
    }
    if (indexOf(projects, title) >= 0) {
      setHelperText(t('projectExisted'))
      return
    }
    setHelperText('')
  }, [title])

  return (
    <>
      <BoxButton onClick={startAddProject}>
        <AddCircleOutlineIcon className="mr-1"/>{t('newProject')}
      </BoxButton>
      <SimpleDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        title={t('newProject')}
        content={
          <TextInput 
            value={title} 
            onChange={event => setTitle(event.target.value)} 
            label={t('projectName')} 
            required
            error={!firstTrial && helperText.length}
            helperText={!firstTrial && helperText }
          />
        }
        onConfirm={confirmToAdd}
      />
    </>
  )
}
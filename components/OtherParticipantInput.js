import React from 'react'
import { omit, find, map, last } from 'lodash'
import { useTranslation } from 'next-i18next'
import { checkEmailFormat } from '/helpers'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import TextInput from './TextInput'
import { Chip, Grid } from '@material-ui/core'
import SimpleDialog from './SimpleDialog'
import TextDivider from './TextDivider'

const filter = createFilterOptions()

export default function OtherParticipantInput(props) {
  const { t } = useTranslation(['meeting', 'login'])

  const [open, setOpen] = React.useState(false)
  const [dialogObject, setDialogObject] = React.useState({})

  const createDialogObject = (email) => {
    const existing = find(props.value, it => it.email === email)
    const newParticipant = {
      email: email || '',
      name: '',
      title: '',
      phone: '',
      address: '',
      others: '',
      ...existing
    }
    setDialogObject(newParticipant)
    if (!existing) props.onChange([...props.value, newParticipant])
  }

  const saveEditedParticipant = () => {
    const newList = map(props.value, it => {
      if (it.email === dialogObject.email) return dialogObject
      return it
    })
    props.onChange(newList)
  }

  const handleUserInput = (event) => {
    setDialogObject({...dialogObject, [event.target.name]: event.target.value})
  }

  return (
    <>
      <Autocomplete
        autoHighlight
        multiple
        options={[]}
        value={props.value}
        onChange={(event, newList, reason) => {
          if (reason === 'select-option') {
            const newValue = last(newList)
            if (newValue.incomplete || typeof newValue === 'string') {
              return
            } else if (newValue && newValue.inputValue) {
              createDialogObject(newValue.inputValue)
              setOpen(true)
            } else {
              props.onChange(newValue)
            }
          } else {
            props.onChange(newList)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          if (params.inputValue !== '') {
            if (!checkEmailFormat(params.inputValue)) {
              filtered.push({
                inputValue: params.inputValue,
                email: `${t('login:incompleteEmail')}: "${params.inputValue}"`,
                incomplete: true
              })
            } else {
              filtered.push({
                inputValue: params.inputValue,
                email: `${t('addParticipant')}: "${params.inputValue}"`,
              })
            }
          }
          return filtered
        }}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.email
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.email}
        freeSolo
        renderInput={(params) => <TextInput {...params} {...omit(props, 'value', 'onChange')}/>}
        noOptionsText={t('noOptions')}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.email}
              label={option.email}
              onClick={() => {setDialogObject(option);setOpen(true)}}
            />
          ))
        }
        getOptionSelected={() => false}
      />
      <SimpleDialog 
        open={open} 
        onClose={() => {saveEditedParticipant();setOpen(false)}}
        title={t('participantDetail')}
        content={
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <TextInput label={t('login:email')} value={dialogObject.email} required disabled/>
            </Grid>
            <TextDivider text={t('belowAreOptional')}/>
            <Grid item xs={12} md={6}>
              <TextInput label={t('login:name')} value={dialogObject.name} name="name" onChange={handleUserInput}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label={t('login:title')} value={dialogObject.title} name="title" onChange={handleUserInput}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label={t('login:phone')} value={dialogObject.phone} name="phone" onChange={handleUserInput}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label={t('login:address')} value={dialogObject.address} name="address" onChange={handleUserInput}/>
            </Grid>
            <Grid item xs={12}>
              <TextInput label={t('login:others')} value={dialogObject.others} name="others" onChange={handleUserInput}/>
            </Grid>
          </Grid>
        }
        noConfirm
      />
    </>
  )
}
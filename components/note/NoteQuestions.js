import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { setList } from '/store/noteSlice'
import { fakeQuestions } from '/data/note'
import { find, map, filter } from 'lodash'

import {
  Typography, Grid, Paper
} from '@material-ui/core'
import CheckBox from '../CheckBox'
import TextInput from '../TextInput'
import Rating from '@material-ui/lab/Rating'

export default function NoteQuestions(props) {
  const questionNotes = useSelector((state) => state.note.questionNotes)
  const dispatch = useDispatch()
  const { t } = useTranslation(['common'])

  const getIsChecked = (question, option) => {
    const answer = find(questionNotes, it => it.question === question && it.option === option)
    return answer && answer.checked || false
  }
  const handleCheck = (question, option, checked) => {
    if (checked) {
      dispatch(setList({
        target: 'questionNotes', 
        list: [...questionNotes, {
          question: question,
          option: option,
          checked: true,
          rate: 0
        }]
      }))
    } else {
      dispatch(setList({
        target: 'questionNotes', 
        list: filter(questionNotes, it => it.question !== question || it.option !== option)
      }))
    }
  }

  const getRating = (question, option) => {
    const answer = find(questionNotes, it => it.question === question && it.option === option)
    return answer && answer.rate || 0
  }
  const handleRating = (question, option, value) => {
    const oldAnswer = find(questionNotes, it => it.question === question && it.option === option)
    if (oldAnswer) {
      dispatch(setList({
        target: 'questionNotes', 
        list: map(questionNotes, it => {
          if (it.question === question && it.option === option) {
            return {...it, rate: value}
          }
          return it
        })
      }))
    } else {
      dispatch(setList({
        target: 'questionNotes', 
        list: [...questionNotes, {
          question: question,
          option: option,
          checked: true,
          rate: value
        }]
      }))
    }
  }

  const othersKey = 'othersInput'
  const getOthers = (question) => {
    const answer = find(questionNotes, it => it.question === question && it.option === othersKey)
    return answer && answer.text || ''
  }
  const handleOthersInput = (question, text) => {
    if (text && text.length) {
      const oldAnswer = find(questionNotes, it => it.question === question && it.option === othersKey)
      if (oldAnswer) {
        dispatch(setList({
          target: 'questionNotes', 
          list: map(questionNotes, it => {
            if (it.question === question && it.option === othersKey) {
              return {...it, text: text}
            }
            return it
          })
        }))
      } else {
        dispatch(setList({
          target: 'questionNotes', 
          list: [...questionNotes, {
            question: question,
            option: othersKey,
            text: text,
            rate: 0
          }]
        }))
      }
    } else {
      dispatch(setList({
        target: 'questionNotes', 
        list: filter(questionNotes, it => it.question !== question || it.option !== othersKey)
      }))
    }
  }
  const handleOthersInputRating = (question, value) => {
    dispatch(setList({
      target: 'questionNotes', 
      list: map(questionNotes, it => {
        if (it.question === question && it.option === othersKey) {
          return {...it, rate: value}
        }
        return it
      })
    }))
  }

  return (
    <Grid container alignItems="center" spacing={2} className="pt-4 pb-2 px-2">
      {fakeQuestions.map((item, idx) =>
        <Grid key={'question' + idx} item xs={12} sm={6} md={4}>
          <Paper elevation={5} className="px-2 py-2">
            <Typography variant="h6">{item.question}</Typography>
            <Grid container>
              {item.options && item.options.map((option, jdx) =>
                <Grid key={'question'+ idx + option} item xs={12} container alignItems="center">
                  <CheckBox
                    label={option}
                    checked={getIsChecked(item.question, option)}
                    onChange={(event) => handleCheck(item.question, option, event.target.checked)}
                  />
                  <Rating
                    name={'question'+ idx + option}
                    value={getRating(item.question, option)} 
                    onChange={(event, value) => handleRating(item.question, option, value)}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextInput 
                  label={t('other')} hideHelperText className="mb-3"
                  value={getOthers(item.question)}
                  onChange={(event) => handleOthersInput(item.question, event.target.value)}
                />
                <Rating 
                  disabled={!getOthers(item.question)}
                  name={'question'+ idx + othersKey}
                  value={getRating(item.question, othersKey)} 
                  onChange={(event, value) => handleOthersInputRating(item.question, value)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </Grid>
  )
}
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import {
  Grid, InputAdornment
} from '@material-ui/core'
import TextInput from '../TextInput'
import CheckBox from '../CheckBox'
import NewProjectButton from './NewProjectButton'
import ProjectCardWithNote from './ProjectCardWithNote'

import SearchIcon from '@material-ui/icons/Search'

export default function NoteProject(props) {
  const { t } = useTranslation(['common', 'note'])
  const projects = useSelector((state) => state.note.projects)

  const [filterSettings, setFilterSettings] = React.useState({
    keyword: '',
    onlyWithNotes: false
  })
  const handleInput = (key, value) => {
    setFilterSettings({...filterSettings, [key]: value})
  }

  return (
    <div className="mx-2 mt-2">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sm={3}>
          <TextInput
            label={t('keyword')}
            value={filterSettings.keyword}
            onChange={(event) => handleInput('keyword', event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon/>
                </InputAdornment>
              )
            }}
            hideHelperText
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CheckBox
            label={t('onlyWithNotes')}
            checked={filterSettings.onlyWithNotes}
            onChange={(event) => handleInput('onlyWithNotes', event.target.checked)}
          />
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <NewProjectButton/>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-2">
        {projects.map((project, idx) =>
          <Grid key={'project'+idx} item xs={12}>
            <ProjectCardWithNote project={project}/>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
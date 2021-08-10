import React from 'react'
import { useTranslation } from 'next-i18next'
import { fakeAlbums } from '/data/note'

import {
  Grid, InputAdornment,
} from '@material-ui/core'
import TextInput from '../TextInput'
import ShowcaseYearPicker from '../ShowcaseYearPicker'
import ShowcaseSeasonPicker from '../ShowcaseSeasonPicker'
import AlbumCardWithNote from './AlbumCardWithNote'
import CheckBox from '../CheckBox'

import SearchIcon from '@material-ui/icons/Search'

export default function NoteAlbum(props) {
  const { t } = useTranslation(['common'])

  const [filterSettings, setFilterSettings] = React.useState({
    keyword: '',
    showcaseYear: null,
    showcaseSeason: null,
    onlyWithNotes: false
  })
  const handleInput = (key, value) => {
    setFilterSettings({...filterSettings, [key]: value})
  }

  return (
    <div className="mx-2 mt-2">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sm={3} md>
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
        <Grid item xs={6} sm={3} md>
          <ShowcaseYearPicker value={filterSettings.showcaseYear} onChange={(v) => handleInput('showcaseYear', v)} optional hideHelperText/>
        </Grid>
        <Grid item xs={6} sm={3} md>
          <ShowcaseSeasonPicker value={filterSettings.showcaseSeason} onChange={(v) => handleInput('showcaseSeason', v)} optional hideHelperText/>
        </Grid>
        <Grid item xs={6} sm={3} md>
          <CheckBox
            label={t('onlyWithNotes')}
            checked={filterSettings.onlyWithNotes}
            onChange={(event) => handleInput('onlyWithNotes', event.target.checked)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-2">
        {fakeAlbums.map((album, idx) =>
          <Grid key={'album'+idx} item xs={6} sm={4} md={3}>
            <AlbumCardWithNote {...album}/>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
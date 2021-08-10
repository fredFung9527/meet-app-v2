import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: {
    useLocalTimezone: true,
    timezone: null,
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'HH:mm'
  },
  reducers: {
    setUseLocalTimezone: (state, action) => {
      state.useLocalTimezone = action.payload === true
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload || null
    },
    setDateFormat: (state, action) => {
      state.dateFormat = action.payload || 'yyyy-MM-dd'
    },
    setTimeFormat: (state, action) => {
      state.timeFormat = action.payload || 'HH:mm'
    },
  },
})

export const { setTimezone, setUseLocalTimezone, setDateFormat, setTimeFormat } = settingsSlice.actions

export default settingsSlice.reducer
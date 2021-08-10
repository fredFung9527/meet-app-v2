import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState: {
    title: 'Home',
    alert: false,
    alertMessage: '',
    alertType: '',
    loading: false,
    meetingOfCurrentNote: null
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload || 'Home'
    },
    alertError: (state, action) => {
      state.alertMessage = action.payload || '-'
      state.alertType = 'error'
      state.alert = true
    },
    alertSuccess: (state, action) => {
      state.alertMessage = action.payload || '-'
      state.alertType = 'success'
      state.alert = true
    },
    closeAlert: (state) => {
      state.alert = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload === true
    },
    setMeetingOfCurrentNote: (state, action) => {
      state.meetingOfCurrentNote = action.payload || null
    },
  },
})

export const { setTitle, alertError, alertSuccess, closeAlert, setLoading, setMeetingOfCurrentNote } = commonSlice.actions

export default commonSlice.reducer
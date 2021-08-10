import { createSlice } from '@reduxjs/toolkit'
import { uniqBy } from 'lodash'

export const meetingSlice = createSlice({
  name: 'meetingSlice',
  initialState: {
    status: null,
    dateTime: null,
    durationMinutes: 30,
    topic: '',
    remarks: '',
    location: '',
    onlineMeetingLink: '',
    showcaseYear: null,
    showcaseSeason: null,
    marketCodeOrCompanyName: null,
    internalParticipants: [],
    otherParticipants: [],
  },
  reducers: {
    initMeeting(state) {
      state.status = null
      state.dateTime = null
      state.durationMinutes = 30
      state.topic = ''
      state.remarks = ''
      state.location = ''
      state.onlineMeetingLink = ''
      state.showcaseYear = null
      state.showcaseSeason = null
      state.marketCodeOrCompanyName = null
      state.internalParticipants = []
      state.otherParticipants = []
    },
    setStatus: (state, action) => {
      state.status = action.payload || null
    },
    setDateTime: (state, action) => {
      state.dateTime = action.payload || null
    },
    setDurationMinutes: (state, action) => {
      state.durationMinutes = action.payload || 30
    },
    setTopic: (state, action) => {
      state.topic = action.payload || ''
    },
    setRemarks: (state, action) => {
      state.remarks = action.payload || ''
    },
    setLocation: (state, action) => {
      state.location = action.payload || ''
    },
    setOnlineMeetingLink: (state, action) => {
      state.onlineMeetingLink = action.payload || ''
    },
    setShowcaseYear: (state, action) => {
      state.showcaseYear = action.payload || null
    },
    setShowcaseSeason: (state, action) => {
      state.showcaseSeason = action.payload || null
    },
    setMarketCodeOrCompanyName: (state, action) => {
      state.marketCodeOrCompanyName = action.payload || null
    },
    setInternalParticipants: (state, action) => {
      state.internalParticipants = action.payload || []
    },
    addInternalParticipants: (state, action) => {
      state.internalParticipants = uniqBy([...state.internalParticipants, ...(action.payload || [])], 'userID')
    },
    setOtherParticipants: (state, action) => {
      state.otherParticipants = action.payload || []
    },
  },
})

export const { 
  setStatus, initMeeting, setDateTime, setDurationMinutes, setTopic, 
  setRemarks, setLocation, setOnlineMeetingLink,
  setShowcaseYear, setShowcaseSeason, setMarketCodeOrCompanyName, 
  addInternalParticipants, setInternalParticipants, setOtherParticipants
} = meetingSlice.actions

export default meetingSlice.reducer
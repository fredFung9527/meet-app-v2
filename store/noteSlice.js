import { createSlice } from '@reduxjs/toolkit'
import { filter } from 'lodash'

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState: {
    createdAt: null,
    meeting: null,
    noteName: '',
    albumNotes: [],
    productNotes: [],
    questionNotes: [],
    projects: [],
    projectNotes: [],
    commonNotes: [],
    relatedNotes: [],
    readers: [],
    collaborators: []
  },
  reducers: {
    initNote: (state, action) => {
      const oldData = action.payload || {}
      state.createdAt = oldData.createdAt || null
      state.meeting = oldData.meeting || null
      state.noteName = oldData.noteName || ''
      state.albumNotes = oldData.albumNotes || []
      state.productNotes = oldData.productNotes || []
      state.questionNotes = oldData.questionNotes || []
      state.projects = oldData.projects || []
      state.projectNotes = oldData.projectNotes || []
      state.commonNotes = oldData.commonNotes || []
      state.relatedNotes = oldData.relatedNotes || []
      state.readers = oldData.readers || []
      state.collaborators = oldData.collaborators || []
    },
    setList: (state, action) => {
      const { target, list } = action.payload
      state[target] = list || []
    },
    deleteProject: (state, action) => {
      state.projects = filter(state.projects, it => it !== action.payload)
      state.projectNotes = filter(state.projectNotes, it => it.project !== action.payload)
    },
  },
})

export const { initNote, setList, deleteProject } = noteSlice.actions

export default noteSlice.reducer
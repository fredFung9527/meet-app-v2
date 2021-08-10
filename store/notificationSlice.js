import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    list: []
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload || []
    },
  },
})

export const { 
  setList
} = notificationSlice.actions

export default notificationSlice.reducer
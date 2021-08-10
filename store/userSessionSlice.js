import { createSlice } from '@reduxjs/toolkit'

export const userSessionSlice = createSlice({
  name: 'userSessionSlice',
  initialState: {
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload || {}
    },
  },
})

export const { setUser, setRememberMe } = userSessionSlice.actions

export default userSessionSlice.reducer
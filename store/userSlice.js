import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    rememberMe: true,
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload || {}
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload === true
    },
  },
})

export const { setUser, setRememberMe } = userSlice.actions

export default userSlice.reducer
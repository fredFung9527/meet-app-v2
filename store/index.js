import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import localStorage from './localStorage'
import sessionStorage from './sessionStorage'

import commonReducers from './commonSlice'
import userReducers from './userSlice'
import settingsReducers from './settingsSlice'
import userSessionReducers from './userSessionSlice'
import meetingReducers from './meetingSlice'
import notificationReducers from './notificationSlice'
import NoteReducers from './noteSlice'

const localPersistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['user', 'settings']
}

const sessionPersistConfig = {
  key: 'session',
  storage: sessionStorage,
}

const reducers = combineReducers({
  common: commonReducers,
  user: userReducers,
  settings: settingsReducers,
  userSession: persistReducer(sessionPersistConfig, userSessionReducers),
  meeting: meetingReducers,
  notification: notificationReducers,
  note: NoteReducers,
})

const persistedReducer = persistReducer(localPersistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export default store
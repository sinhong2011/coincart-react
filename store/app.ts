import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Languangs } from '../types/i18n'

export type AppConfigState = {
  mode: 'dark' | 'light'
  language: Languangs
}

const initialState: AppConfigState = {
  mode: 'light',
  language: 'tc',
}

export type SetLanguagePayload = AppConfigState['language']

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initApp: state => {
      const appConfig = JSON.parse(
        localStorage.getItem('appConfig') || ''
      ) as AppConfigState

      if (appConfig) {
        state.language = appConfig.language
        state.mode = appConfig.mode
      }
    },
    setDarkMode: state => {
      const mode = 'dark'
      state.mode = mode
      localStorage.setItem('appConfig', JSON.stringify({ ...state, mode }))
    },
    setLightMode: state => {
      const mode = 'light'
      state.mode = mode
      localStorage.setItem('appConfig', JSON.stringify({ ...state, mode }))
    },
    setLanguage(state, { payload }: PayloadAction<SetLanguagePayload>) {
      state.language = payload

      localStorage.setItem(
        'appConfig',
        JSON.stringify({ ...state, language: payload })
      )
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer

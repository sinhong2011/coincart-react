import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import router from 'next/router'
import { Languangs } from '../types/i18n'
import { CoincartSummaryData } from '../types/apiTypes'

export type AppConfigState = {
  mode: 'dark' | 'light'
  language: Languangs
  coincartSummary: CoincartSummaryData | null
}

const initialState: AppConfigState = {
  mode: 'light',
  language: 'tc',
  coincartSummary: null,
}

export type SetLanguagePayload = AppConfigState['language']

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initApp: state => {
      const appConfigStr = localStorage.getItem('appConfig') || ''

      if (appConfigStr) {
        const appConfig = JSON.parse(appConfigStr) as AppConfigState

        state.language = (router.locale as Languangs) || appConfig.language
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

    getCoincartSummary(state, { payload }: PayloadAction<CoincartSummaryData>) {
      state.coincartSummary = payload
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import router from 'next/router'
import { Languangs } from '../types/i18n'
import { CoincartSummaryData, CoinCartScheduleDetail } from '../types/apiTypes'

export type AppConfigState = {
  mode: 'dark' | 'light'
  language: Languangs
  coincartSummary: CoincartSummaryData | null
  coincartScheduleList: {
    dataSize: number
    records: CoinCartScheduleDetail[]
  } | null
}

const initialState: AppConfigState = {
  mode: 'light',
  language: 'tc',
  coincartSummary: null,
  coincartScheduleList: null,
}

export type SetLanguagePayload = AppConfigState['language']

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initApp: state => {
      const appConfigStr = window.localStorage.getItem('appConfig') || ''

      if (appConfigStr) {
        const appConfig = JSON.parse(appConfigStr) as AppConfigState

        state.language = (router.locale as Languangs) || appConfig.language
        state.mode = appConfig.mode
      }
    },
    setDarkMode: state => {
      const mode = 'dark'
      state.mode = mode
      window.localStorage.setItem(
        'appConfig',
        JSON.stringify({ ...state, mode })
      )
    },
    setLightMode: state => {
      const mode = 'light'
      state.mode = mode
      window.localStorage.setItem(
        'appConfig',
        JSON.stringify({ ...state, mode })
      )
    },
    setLanguage(state, { payload }: PayloadAction<SetLanguagePayload>) {
      state.language = payload

      window.localStorage.setItem(
        'appConfig',
        JSON.stringify({ ...state, language: payload })
      )
    },

    getCoincartSummary(state, { payload }: PayloadAction<CoincartSummaryData>) {
      state.coincartSummary = payload
    },

    getCoinCartSchedule(
      state,
      {
        payload,
      }: PayloadAction<{
        dataSize: number
        records: CoinCartScheduleDetail[]
      }>
    ) {
      state.coincartScheduleList = payload
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer

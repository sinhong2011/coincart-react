import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import router from 'next/router'
import { Languangs } from '../types/i18n'
import { CoincartSummaryData, CoinCartScheduleDetail } from '../types/apiTypes'

export type AppConfigState = {
  mode: 'dark' | 'light'
  language: Languangs
  coincartSummary: CoincartSummaryData | null
  coincartScheduleList: CoinCartScheduleDetail[] | null
  districtOptions: string[] | null
  availableCoincarts: CoinCartScheduleDetail[] | null
  mobileOpen: boolean
}

const initialState: AppConfigState = {
  mode: 'light',
  language: 'tc',
  coincartSummary: null,
  coincartScheduleList: null,
  districtOptions: null,
  availableCoincarts: null,
  mobileOpen: false,
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
      { payload }: PayloadAction<CoinCartScheduleDetail[]>
    ) {
      state.coincartScheduleList = payload
    },
    setDistrictOptions(state, { payload }: PayloadAction<string[]>) {
      state.districtOptions = payload
    },
    setAvailableCoincarts(
      state,
      { payload }: PayloadAction<CoinCartScheduleDetail[]>
    ) {
      state.availableCoincarts = payload
    },
    setMobileOpen(state, { payload }: PayloadAction<boolean>) {
      state.mobileOpen = payload
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import router from 'next/router'
import { Languangs } from '../types/i18n'
import { CoincartSummaryData, CoinCartScheduleDetail } from '../types/apiTypes'
import { getMemoAppLang } from '../utils/xCm'

export type AppConfigState = {
  mode: 'dark' | 'light'
  language: Languangs
  coincartSummary: CoincartSummaryData | null
  coincartScheduleList: CoinCartScheduleDetail[] | null
  districtOptions: string[] | null
  availableCoincarts: CoinCartScheduleDetail[] | null
  mobileOpen: boolean
  selectedDistrics: string
  focusedCoincart: number | null
}

const initialState: AppConfigState = {
  mode: 'light',
  language: getMemoAppLang(),
  coincartSummary: null,
  coincartScheduleList: null,
  districtOptions: null,
  availableCoincarts: null,
  mobileOpen: false,
  selectedDistrics: '',
  focusedCoincart: null,
}

export type SetLanguagePayload = AppConfigState['language']

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initApp: state => {
      state.language = (router.locale as Languangs) || getMemoAppLang()
    },
    setDarkMode: state => {
      const mode = 'dark'
      state.mode = mode
    },
    setLightMode: state => {
      const mode = 'light'
      state.mode = mode
    },
    setLanguage(state, { payload }: PayloadAction<SetLanguagePayload>) {
      state.language = payload
      window.localStorage.setItem('appLanguage', payload)
      window.i18n.changeLanguage(payload)
      state.selectedDistrics = ''
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
    setSelectedDistrics(state, { payload }: PayloadAction<string>) {
      state.selectedDistrics = payload
    },
    setFocusedCoincart(state, { payload }: PayloadAction<number>) {
      state.focusedCoincart = payload
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer

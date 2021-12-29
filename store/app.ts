import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import router from 'next/router'
import { Languangs } from 'types/i18n'
import { CoinCartScheduleDetail } from 'types/api-types'
import { getMemoAppLang } from 'utils/xCm'

export type AppConfigState = {
  mode: 'dark' | 'light'
  language: Languangs | null
  coincartScheduleList: CoinCartScheduleDetail[] | null
  districtOptions: string[] | null
  availableCoincarts: CoinCartScheduleDetail[] | null
  mobileOpen: boolean
  focusedCoincart: number | null
  serviceHours: string
  initiaized: boolean
  loading: boolean
}

const initialState: AppConfigState = {
  mode: 'light',
  language: getMemoAppLang(),
  coincartScheduleList: null,
  districtOptions: null,
  availableCoincarts: null,
  mobileOpen: false,
  focusedCoincart: null,
  serviceHours: '',
  initiaized: false,
  loading: false,
}

export type SetLanguagePayload = AppConfigState['language']

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initApp: state => {
      const initLang = (router.locale as Languangs) || getMemoAppLang()
      window.i18n.changeLanguage(initLang)
      window.localStorage.setItem('appLanguage', initLang)

      state.language = initLang
      state.initiaized = true
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
      router.push(router.route, router.route, {
        locale: payload!,
      })
      state.language = payload
      window.localStorage.setItem('appLanguage', payload!)
      window.i18n.changeLanguage(payload!)
    },

    getCoinCartSchedule() {
      return undefined
    },
    getCoinCartScheduleSuccess(
      state,
      { payload }: PayloadAction<CoinCartScheduleDetail[]>
    ) {
      state.coincartScheduleList = payload
    },
    getCoinCartScheduleFailure() {
      return undefined
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

    setFocusedCoincart(state, { payload }: PayloadAction<number | null>) {
      state.focusedCoincart = payload
    },
    getCoinCartServiceHours() {
      return undefined
    },
    getCoinCartServiceHoursSuccess(
      state,
      { payload }: PayloadAction<{ serviceHours: string }>
    ) {
      state.serviceHours = payload.serviceHours
    },
    getCoinCartServiceHoursFailure() {
      return undefined
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import type { AppDispatch, RootState } from './store-types'
import { appActions, SetLanguagePayload } from './app'
import { CoinCartScheduleDetail } from '../types/api-types'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppConfigActions = {
  initApp: () => void
  setDarkMode: () => void
  setLightMode: () => void
  setLanguage: (lang: SetLanguagePayload) => void
  setDistrictOptions: (optionList: string[]) => void
  getCoinCartSchedule: () => void
  setAvailableCoincarts: (arr: CoinCartScheduleDetail[]) => void
  setMobileOpen: (mobileOpen: boolean) => void
  setFocusedCoincart: (focusedCoincart: number) => void
  getCoinCartServiceHours: () => void
}

export const useAppConfig = () => {
  const appState = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const methods: AppConfigActions = {
    initApp: () => {
      dispatch(appActions.initApp())
    },
    setDarkMode: () => {
      dispatch(appActions.setDarkMode())
    },
    setLightMode: () => {
      dispatch(appActions.setLightMode())
    },
    setLanguage: lang => {
      i18n.changeLanguage(lang!)
      dispatch(appActions.setLanguage(lang))
    },
    setDistrictOptions: optionList => {
      dispatch(appActions.setDistrictOptions(optionList))
    },
    getCoinCartSchedule: () => {
      dispatch(appActions.getCoinCartSchedule())
    },
    setAvailableCoincarts: arr => {
      dispatch(appActions.setAvailableCoincarts(arr))
    },
    setMobileOpen: mobileOpen => {
      dispatch(appActions.setMobileOpen(mobileOpen))
    },
    setFocusedCoincart: focusedCoincart => {
      dispatch(appActions.setFocusedCoincart(focusedCoincart))
    },
    getCoinCartServiceHours: () => {
      dispatch(appActions.getCoinCartServiceHours())
    },
  }

  const appConfig = { appState, ...methods }

  return appConfig
}

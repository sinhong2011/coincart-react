import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import type { AppDispatch, RootState } from './index'
import { appActions, SetLanguagePayload } from './app'
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppConfigActions = {
  initApp: () => void
  setDarkMode: () => void
  setLightMode: () => void
  setLanguage: (lang: SetLanguagePayload) => void
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
      i18n.changeLanguage(lang)
      dispatch(appActions.setLanguage(lang))
    },
  }

  const appConfig = { appState, ...methods }

  return appConfig
}

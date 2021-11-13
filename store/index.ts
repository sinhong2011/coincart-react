import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { createWrapper } from 'next-redux-wrapper'
import appReducer from './app'

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: process.env.REACT_APP_ENV !== 'PRODUCTION',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    ...(process.env.REACT_APP_ENV !== 'PRODUCTION' ? [logger] : []),
  ],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper(() => store /* , { debug: isDebug } */)

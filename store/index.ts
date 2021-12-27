import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import appReducer from 'store/app'
import { rootSaga } from 'saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: process.env.REACT_APP_ENV !== 'PRODUCTION',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    ...(process.env.REACT_APP_ENV !== 'PRODUCTION' ? [logger] : []),
    sagaMiddleware,
  ],
})

sagaMiddleware.run(rootSaga)

export const wrapper = createWrapper(() => store /* , { debug: isDebug } */)

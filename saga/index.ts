import { all, fork } from 'redux-saga/effects'
import scheduleSaga from 'saga/schedule'

export function* rootSaga() {
  yield all([fork(scheduleSaga)])
}

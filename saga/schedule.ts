import xApiClient from 'api/xApi'
import { all, call, takeLatest, select, put } from 'redux-saga/effects'
import { appActions, AppConfigState } from 'store/app'

import {
  GetCoinCartServiceHoursResponse,
  GetCoinCartScheduleResponse,
  ApiParamsLangs,
} from 'types/api-types'
import { LangsMapping } from 'constant/const'
import { AxiosResponse } from 'axios'

import { getFilterCoincartList } from '../utils/xCm'

function* getCoinCartServiceHours() {
  try {
    const { language }: AppConfigState = yield select(state => state.app)
    const { data }: AxiosResponse<GetCoinCartServiceHoursResponse> = yield call(
      xApiClient.getCoinCartServiceHours,
      {
        lang: LangsMapping[language!] as ApiParamsLangs,
      }
    )
    console.log('getCoinCartServiceHours response', data)
    yield put(
      appActions.getCoinCartServiceHoursSuccess({
        serviceHours: data.serviceHours,
      })
    )
  } catch (error) {
    console.log('getCoinCartServiceHours error: ', error)
    yield put(appActions.getCoinCartServiceHoursFailure())
  }
}

function* getCoinCartSchedule() {
  yield put(appActions.setLoading(true))
  try {
    const { language }: AppConfigState = yield select(state => state.app)
    yield put(appActions.getCoinCartServiceHours())

    const { data }: AxiosResponse<GetCoinCartScheduleResponse> = yield call(
      xApiClient.getCoinCartSchedule,
      {
        lang: LangsMapping[language!] as ApiParamsLangs,
      }
    )
    console.log('getCoinCartSchedule response', data)

    const scheduleList = data.result.records
      .slice(0)
      .map((e, index) => ({ ...e, index }))
    const districts = Array.from(
      new Set(getFilterCoincartList(scheduleList).map(e => e.district))
    )
    yield put(appActions.getCoinCartScheduleSuccess(scheduleList))
    yield put(
      appActions.setAvailableCoincarts(getFilterCoincartList(scheduleList))
    )
    yield put(appActions.setDistrictOptions(districts))
  } catch (error) {
    console.log('getCoinCartSchedule error: ', error)
    yield put(appActions.getCoinCartScheduleFailure())
  }
  yield put(appActions.setLoading(false))
}

function* scheduleSaga() {
  yield all([
    takeLatest(appActions.getCoinCartSchedule, getCoinCartSchedule),
    takeLatest(appActions.getCoinCartServiceHours, getCoinCartServiceHours),
  ])
}

export default scheduleSaga

import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Languangs } from 'types/i18n'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import xApiClient from '../../api/xApi'
import { appActions } from '../../store/app'
import { CoinCartScheduleDetail } from '../../types/apiTypes'

export const useHomePageService = () => {
  const appState = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { error, isFetching, data, refetch } = useQuery(
    '',
    () => xApiClient.getCoinCartSchedule({ lang: i18n.language as Languangs }),
    {
      enabled: false,
    }
  )
  const [availableCoincarts, setAvailableCoincarts] = useState<
    CoinCartScheduleDetail[] | null
  >(appState.coincartScheduleList)

  useEffect(() => {
    if (!isFetching && data && data.result) {
      console.log('data.result', data.result)
      setAvailableCoincarts(
        data.result.records.filter(
          e => e.address !== null && e.latitude !== null && e.longitude !== null
        )
      )
      dispatch(appActions.getCoinCartSchedule(data.result.records))
    }
  }, [isFetching, data])

  const getCoinCartSchedule = () => {
    if (appState.coincartScheduleList) return
    refetch()
  }

  return {
    getCoinCartSchedule,
    isFetching,
    error,
    availableCoincarts,
    coincartScheduleList: appState.coincartScheduleList,
  }
}

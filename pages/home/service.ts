import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Languangs } from 'types/i18n'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import xApiClient from '../../api/xApi'
import { appActions } from '../../store/app'

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

  useEffect(() => {
    console.log('data', data)
    if (!isFetching && data && data.result) {
      console.log('data.result', data.result)
      dispatch(appActions.getCoinCartSchedule(data.result))
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
    coincartScheduleList: appState.coincartScheduleList,
  }
}

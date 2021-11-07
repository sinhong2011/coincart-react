import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Languangs } from 'types/i18n'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import xApiClient from 'api/xApi'
import { appActions } from 'store/app'
import { CoinCartScheduleDetail } from 'types/apiTypes'
import { DistrictOption } from 'types/common'

const getFilterCoincartList = (list: CoinCartScheduleDetail[]) =>
  list.filter(e => !!e.address && !!e.latitude && !!e.longitude)

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
  >(getFilterCoincartList(appState.coincartScheduleList || []))

  const [districtOptions, setDistrictOptions] = useState<DistrictOption[]>([])
  const [selectedDistrics, setSelectedDistrics] = useState<DistrictOption[]>([])

  useEffect(() => {
    if (appState.coincartScheduleList) return

    if (!isFetching && data && data?.result?.datasize > 0) {
      const arr = data.result.records.slice(0)

      const districts = Array.from(
        new Set(getFilterCoincartList(arr).map(e => e.district))
      )

      setDistrictOptions(districts.map(e => ({ label: e, value: e })))
      setAvailableCoincarts(getFilterCoincartList(arr))

      dispatch(appActions.getCoinCartSchedule(arr))
    }
  }, [isFetching, data, appState.coincartScheduleList])

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
    districtOptions,
    setAvailableCoincarts,
    selectedDistrics,
    setSelectedDistrics,
  }
}

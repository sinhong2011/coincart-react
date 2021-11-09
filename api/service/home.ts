import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Languangs } from 'types/i18n'
import { useAppSelector, useAppConfig } from 'store/hooks'
import xApiClient from 'api/xApi'
import { CoinCartScheduleDetail } from 'types/apiTypes'
import { DistrictOption } from 'types/common'

const getFilterCoincartList = (list: CoinCartScheduleDetail[] = []) =>
  Array.isArray(list)
    ? list.filter(e => !!e.address && !!e.latitude && !!e.longitude)
    : []

export const useHomePageService = () => {
  const appState = useAppSelector(state => state.app)
  // const dispatch = useAppDispatch()
  const appConfig = useAppConfig()

  const { i18n } = useTranslation()
  const { error, isFetching, data, refetch } = useQuery(
    '',
    () => xApiClient.getCoinCartSchedule({ lang: i18n.language as Languangs }),
    {
      enabled: false,
    }
  )

  const [selectedDistrics, setSelectedDistrics] = useState<DistrictOption[]>([])

  useEffect(() => {
    if (appState.coincartScheduleList) return

    if (!isFetching && data && data?.result?.datasize > 0) {
      const arr = data.result.records
        .slice(0)
        .map((e, index) => ({ ...e, index }))

      const districts = Array.from(
        new Set(getFilterCoincartList(arr).map(e => e.district))
      )

      appConfig.setDistrictOptions(districts.map(e => ({ label: e, value: e })))

      appConfig.setAvailableCoincarts(getFilterCoincartList(arr))

      appConfig.getCoinCartSchedule(arr)
    }
  }, [isFetching, data, appState.coincartScheduleList])

  useEffect(() => {
    if (selectedDistrics.length <= 0) {
      appConfig.setAvailableCoincarts(
        getFilterCoincartList(appState.coincartScheduleList!)
      )
    } else {
      const filteredList = getFilterCoincartList(
        appState.coincartScheduleList || []
      )?.filter(coincart =>
        selectedDistrics.some(e => e.value === coincart.district)
      )

      appConfig.setAvailableCoincarts(filteredList)
    }
  }, [selectedDistrics])

  const getCoinCartSchedule = () => {
    // if (appState.coincartScheduleList) return
    refetch()
  }

  return {
    getCoinCartSchedule,
    isFetching,
    error,
    availableCoincarts: [...(appState.availableCoincarts || [])],
    coincartScheduleList: appState.coincartScheduleList,
    districtOptions: appState.districtOptions,
    setAvailableCoincarts: appConfig.setAvailableCoincarts,
    selectedDistrics,
    setSelectedDistrics,
    fullCoincartScheduleList: appState.coincartScheduleList,
  }
}

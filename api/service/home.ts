import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Languangs } from 'types/i18n'
import { useAppSelector, useAppConfig } from 'store/hooks'
import xApiClient from 'api/xApi'
import { CoinCartScheduleDetail } from 'types/apiTypes'

import { Map as LeafletMapProps } from 'leaflet'

const getFilterCoincartList = (list: CoinCartScheduleDetail[] = []) =>
  Array.isArray(list)
    ? list.filter(e => !!e.address && !!e.latitude && !!e.longitude)
    : []

export const useHomePageService = () => {
  const appState = useAppSelector(state => state.app)
  const [map, setMap] = useState<LeafletMapProps | null>(null)
  const appConfig = useAppConfig()

  const { i18n } = useTranslation()
  const { error, isFetching, data, refetch } = useQuery(
    '',
    () => xApiClient.getCoinCartSchedule({ lang: i18n.language as Languangs }),
    {
      enabled: false,
    }
  )

  useEffect(() => {
    if (appState.coincartScheduleList) return

    if (!isFetching && data && data?.result?.datasize > 0) {
      const arr = data.result.records
        .slice(0)
        .map((e, index) => ({ ...e, index }))

      const districts = Array.from(
        new Set(getFilterCoincartList(arr).map(e => e.district))
      )

      appConfig.setDistrictOptions(districts)

      appConfig.setAvailableCoincarts(getFilterCoincartList(arr))

      appConfig.getCoinCartSchedule(arr)
    }
  }, [isFetching, data, appState.coincartScheduleList])

  useEffect(() => {
    if (!appState.selectedDistrics) {
      appConfig.setAvailableCoincarts(
        getFilterCoincartList(appState.coincartScheduleList!)
      )
    } else {
      const filteredList = getFilterCoincartList(
        appState.coincartScheduleList || []
      )?.filter(coincart => coincart.district === appState.selectedDistrics)

      appConfig.setAvailableCoincarts(filteredList)

      const [firstCoincart] = filteredList
      window?.map.setView([firstCoincart.latitude, firstCoincart.longitude])
    }
  }, [appState.selectedDistrics])

  useEffect(() => {
    if (map) window.map = map
  }, [map])

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
    selectedDistrics: appState.selectedDistrics,
    setSelectedDistrics: appConfig.setSelectedDistrics,
    fullCoincartScheduleList: appState.coincartScheduleList,
    setMap,
    map,
    focusedCoincart: appState.focusedCoincart,
    setFocusedCoincart: appConfig.setFocusedCoincart,
  }
}

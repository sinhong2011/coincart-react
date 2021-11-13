import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Languangs } from 'types/i18n'
import { useAppSelector, useAppConfig } from 'store/hooks'
import xApiClient from 'api/xApi'
import { CoinCartScheduleDetail } from 'types/apiTypes'

import { Map as LeafletMapProps } from 'leaflet'
import { isBrowser } from '../../utils/xCm'

const getFilterCoincartList = (list: CoinCartScheduleDetail[] = []) =>
  Array.isArray(list)
    ? list.filter(e => !!e.address && !!e.latitude && !!e.longitude)
    : []

export const useHomePageService = () => {
  const appState = useAppSelector(state => state.app)
  const [map, setMap] = useState<LeafletMapProps | null>(null)
  const appConfig = useAppConfig()

  const { i18n } = useTranslation()
  const { error, isFetching, data, refetch, isSuccess } = useQuery(
    '',
    () =>
      xApiClient.getCoinCartSchedule({ lang: appState.language as Languangs }),
    {
      enabled: false,
    }
  )

  useEffect(() => {
    if (data) {
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
  }, [data])

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
      if (firstCoincart)
        window?.map.setView([firstCoincart.latitude, firstCoincart.longitude])
    }
  }, [appState.selectedDistrics])

  useEffect(() => {
    if (map) window.map = map
  }, [map])

  useEffect(() => {
    if (i18n && isBrowser()) {
      window.i18n = i18n
    }
  }, [i18n])

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

import { useState, useEffect, useContext } from 'react'
import { Map as LeafletMapProps } from 'leaflet'

import { defaultCenter } from 'constant/map'
import { Coordinate } from 'types/common'
import { getCurrentLocation, isBrowser } from 'utils/xCm'
import { BottomSheetContext } from 'context/bottom-sheet/slice'

import { CartDeatailTitle, CartDetail } from 'components/CoinCartDetail'
import { CoinCartScheduleDetail } from 'types/api-types'
import { useAppConfig } from 'store/hooks'

const currentPosition: Coordinate = isBrowser()
  ? JSON.parse(window.localStorage.getItem('currentPosition')!)
  : null

export const useCurrentLocation = () => {
  const [currLocation, setCurrLocation] = useState<Coordinate>(
    currentPosition || defaultCenter
  )

  const initCurrentLocation = async () => {
    const position = await getCurrentLocation()

    if (isBrowser())
      window.localStorage.setItem('currentPosition', JSON.stringify(position))
    setCurrLocation(position || defaultCenter)
  }

  return { currLocation, initCurrentLocation }
}

export const useMap = () => {
  const [map, setMap] = useState<LeafletMapProps | null>(null)

  useEffect(() => {
    if (map) window.map = map
  }, [map])

  return {
    setMap,
    map,
  }
}

export const useOpenCoincartDetail = () => {
  const [, { openBottomSheet }] = useContext(BottomSheetContext)
  const { setFocusedCoincart } = useAppConfig()

  const openCoincartDetail = (coinCart: CoinCartScheduleDetail) => {
    window?.map.setView([coinCart.latitude, coinCart.longitude], 14)
    setFocusedCoincart(coinCart.index)
    openBottomSheet?.({
      title: <CartDeatailTitle />,
      content: <CartDetail coinCart={coinCart} />,
    })
  }

  return {
    openCoincartDetail,
  }
}

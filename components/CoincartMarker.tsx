import { Marker } from 'react-leaflet'
import L from 'leaflet'
import * as React from 'react'

import { CoinCartScheduleDetail } from 'types/api-types'
import { useAppConfig } from 'store/hooks'
import { useOpenCoincartDetail } from 'utils/xHook'

const getIcon = (className = '') =>
  L.icon({
    className,
    iconUrl: '/delivery-truck-delivery-svgrepo-com.svg',
    iconSize: className === 'focused-coincart' ? [48, 48] : [32, 32],
  })

type CoincartMarkerProps = {
  coinCart: CoinCartScheduleDetail
}

const CoincartMarker = ({ coinCart }: CoincartMarkerProps): JSX.Element => {
  const {
    appState: { focusedCoincart },
  } = useAppConfig()
  const { openCoincartDetail } = useOpenCoincartDetail()

  return (
    <Marker
      position={[coinCart.latitude, coinCart.longitude]}
      icon={getIcon(
        focusedCoincart === coinCart.index ? 'focused-coincart' : ''
      )}
      eventHandlers={{
        click: () => {
          openCoincartDetail(coinCart)
        },
      }}></Marker>
  )
}

export default CoincartMarker

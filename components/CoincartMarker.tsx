import { Marker } from 'react-leaflet'
import L from 'leaflet'
import * as React from 'react'
import { useTranslation } from 'next-i18next'
import { CoinCartScheduleDetail } from '../types/api-types'
import { BottomSheetContext } from '../context/bottom-sheet/slice'
import { CartDetail } from './CoinCartDetail'
import { useAppConfig } from '../store/hooks'

const getIcon = (className = '') =>
  L.icon({
    className,
    iconUrl: '/delivery-truck-delivery-svgrepo-com.svg',
    iconSize: className === 'focused-coincart' ? [46, 46] : [32, 32],
  })

type CoincartMarkerProps = {
  coinCart: CoinCartScheduleDetail
}

const CoincartMarker = ({ coinCart }: CoincartMarkerProps): JSX.Element => {
  const [, { openBottomSheet }] = React.useContext(BottomSheetContext)
  const {
    appState: { focusedCoincart },
    setFocusedCoincart,
  } = useAppConfig()
  const { t } = useTranslation()
  return (
    <Marker
      position={[coinCart.latitude, coinCart.longitude]}
      icon={getIcon(
        focusedCoincart === coinCart.index ? 'focused-coincart' : ''
      )}
      eventHandlers={{
        click: () => {
          window?.map.setView([coinCart.latitude, coinCart.longitude], 14)
          setFocusedCoincart(coinCart.index)
          openBottomSheet?.({
            title: t('common.detail'),
            content: <CartDetail coinCart={coinCart} />,
          })
        },
      }}></Marker>
  )
}

export default CoincartMarker

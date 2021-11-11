import { Marker } from 'react-leaflet'
import L from 'leaflet'
import * as React from 'react'
import { CoinCartScheduleDetail } from '../types/apiTypes'
import { GlobalDialogContext } from '../context/globaldialog/slice'
import { CartDetail } from './CoinCartDetail'
import { useHomePageService } from '../api/service/home'

const getIcon = (className = '') =>
  L.icon({
    className,
    iconUrl: '/delivery-truck-delivery-svgrepo-com.svg',
    iconSize: className === 'focused-coincart' ? [56, 56] : [32, 32],
  })

type CoincartMarkerProps = {
  coinCart: CoinCartScheduleDetail
}

const CoincartMarker = ({ coinCart }: CoincartMarkerProps): JSX.Element => {
  const [, { openGlobalDialog }] = React.useContext(GlobalDialogContext)
  const { focusedCoincart, setFocusedCoincart } = useHomePageService()

  return (
    <Marker
      position={[coinCart.latitude, coinCart.longitude]}
      icon={getIcon(
        focusedCoincart === coinCart.index ? 'focused-coincart' : ''
      )}
      eventHandlers={{
        click: () => {
          setFocusedCoincart(coinCart.index)
          openGlobalDialog?.({
            title: 'Detail',
            content: (
              <CartDetail
                coinCart={coinCart}
                titleVariant="h6"
                childrenVariant="body1"
              />
            ),
          })
        },
      }}></Marker>
  )
}

export default CoincartMarker

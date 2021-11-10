import { Marker } from 'react-leaflet'
import L from 'leaflet'
import * as React from 'react'
import { CoinCartScheduleDetail } from '../types/apiTypes'
import { GlobalDialogContext } from '../context/globaldialog/slice'
import { CartDetail } from './CoinCartDetail'

const icon = L.icon({
  iconUrl: '/delivery-truck-delivery-svgrepo-com.svg',
  iconSize: [32, 32],
})

type CoincartMarkerProps = {
  coinCart: CoinCartScheduleDetail
}

const CoincartMarker = ({ coinCart }: CoincartMarkerProps): JSX.Element => {
  const [, { openGlobalDialog }] = React.useContext(GlobalDialogContext)

  return (
    <Marker
      position={[coinCart.latitude, coinCart.longitude]}
      icon={icon}
      eventHandlers={{
        click: e => {
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

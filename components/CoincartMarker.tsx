import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { CoinCartScheduleDetail } from '../types/apiTypes'

const icon = L.icon({
  iconUrl: '/delivery-truck-delivery-svgrepo-com.svg',
  iconSize: [32, 32],
})

type CoincartMarkerProps = {
  coinCart: CoinCartScheduleDetail
}

const CoincartMarker = ({ coinCart }: CoincartMarkerProps): JSX.Element => (
  <Marker
    position={[coinCart.latitude, coinCart.longitude]}
    icon={icon}></Marker>
)

export default CoincartMarker

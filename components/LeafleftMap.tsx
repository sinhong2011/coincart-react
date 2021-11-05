import { MapContainer, TileLayer } from 'react-leaflet'

import { useCurrentLocation } from '../utils/xHook'
import { useHomePageService } from '../pages/home/service'
import CoincartMarker from './CoincartMarker'
const mapboxStyleUrl = `https://api.mapbox.com/styles/v1/niskan516/ckvja1tgj8qyb18rsvygg4v9z/tiles/256/{z}/{x}/{y}@2x?lang=tc&access_token=${process.env.MAPBOX_KEY}`

const LeafleftMap = () => {
  const { currLocation } = useCurrentLocation()
  const { availableCoincarts } = useHomePageService()

  return (
    <MapContainer
      style={{
        position: 'fixed',
        top: 'calc(env(safe-area-inset-bottom) / 2)',
        left: 0,
        right: 0,
        bottom: 'calc(56px + (env(safe-area-inset-bottom) / 2))',
        borderRadius: 5,
        overflow: 'hidden',
      }}
      center={[currLocation.latitude, currLocation.longitude]}
      zoom={17}
      scrollWheelZoom={false}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={mapboxStyleUrl}
      />
      {(availableCoincarts || []).map((coinCart, cIndex) => (
        <CoincartMarker key={cIndex.toString()} coinCart={coinCart} />
      ))}
    </MapContainer>
  )
}

export default LeafleftMap

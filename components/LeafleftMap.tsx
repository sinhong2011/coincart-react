import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCurrentLocation } from '../utils/xHook'

const mapboxStyleUrl = `https://api.mapbox.com/styles/v1/niskan516/ckvja1tgj8qyb18rsvygg4v9z/tiles/256/{z}/{x}/{y}@2x?lang=tc&access_token=${process.env.MAPBOX_KEY}`

const LeafleftMap = () => {
  const { currLocation } = useCurrentLocation()

  return (
    <MapContainer
      style={{
        height: '100%',
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
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default LeafleftMap

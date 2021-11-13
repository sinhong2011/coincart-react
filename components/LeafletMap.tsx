import { MapContainer, TileLayer, ZoomControl, Marker } from 'react-leaflet'
import React from 'react'

import L, { Map as LeafletMapProps } from 'leaflet'

import { useCurrentLocation } from 'utils/xHook'
import { useHomePageService } from 'api/service/home'
import CoincartMarker from 'components/CoincartMarker'
import { IconButton } from '@chakra-ui/react'
import { MdOutlineNavigation } from 'react-icons/md'

const CurrentLocationIcon = L.icon({
  iconUrl: '/map-current-location.svg',
  iconSize: [36, 36],
})

const mapboxStyleUrl = `https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?lang=tc&access_token=${process.env.MAPBOX_KEY}`

const LocateButton = ({ map }: { map: LeafletMapProps }) => {
  const { currLocation } = useCurrentLocation()

  const onClick = () => {
    window?.map.setView([currLocation.latitude, currLocation.longitude], 12)
  }

  return (
    <IconButton
      aria-label="navigation"
      style={{
        position: 'absolute',
        zIndex: 2,
        bottom: 'calc(env(safe-area-inset-bottom) + 40px)',
        right: 6,
      }}
      colorScheme="white"
      onClick={onClick}
      size="large">
      <MdOutlineNavigation size="30" />
    </IconButton>
  )
}

const LeafletMap = () => {
  const { currLocation } = useCurrentLocation()
  const { availableCoincarts, fullCoincartScheduleList, map, setMap } =
    useHomePageService()

  const displayMap = React.useMemo(
    () => (
      <MapContainer
        style={{
          position: 'fixed',
          top: 'calc(env(safe-area-inset-bottom) / 2)',
          left: 0,
          right: 0,
          bottom: 'calc((env(safe-area-inset-bottom) / 2))',
          borderRadius: 5,
          overflow: 'hidden',
        }}
        center={[currLocation.latitude, currLocation.longitude]}
        zoom={12}
        scrollWheelZoom={false}
        zoomControl={false}
        whenCreated={v => {
          setMap(v)
        }}>
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={mapboxStyleUrl}
        />
        <ZoomControl position="topleft"></ZoomControl>
        {(availableCoincarts || fullCoincartScheduleList || []).map(
          (coinCart, cIndex) => (
            <CoincartMarker key={cIndex.toString()} coinCart={coinCart} />
          )
        )}
        {map && (
          <Marker
            icon={CurrentLocationIcon}
            position={[currLocation.latitude, currLocation.longitude]}></Marker>
        )}
      </MapContainer>
    ),
    [availableCoincarts]
  )

  return (
    <div className="map-container">
      {map && <LocateButton map={map} />}
      {displayMap}
    </div>
  )
}

export default LeafletMap

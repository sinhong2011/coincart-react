import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import React, { useCallback } from 'react'

import { Map as LeafletMapProps } from 'leaflet'
import { IconButton } from '@mui/material'
import { Navigation } from '@mui/icons-material'
import { useCurrentLocation } from '../utils/xHook'
import { useHomePageService } from '../api/service/home'
import CoincartMarker from './CoincartMarker'
const mapboxStyleUrl = `https://api.mapbox.com/styles/v1/niskan516/ckvja1tgj8qyb18rsvygg4v9z/tiles/256/{z}/{x}/{y}@2x?lang=tc&access_token=${process.env.MAPBOX_KEY}`

const LocateButton = ({ map }: { map: LeafletMapProps }) => {
  const { currLocation } = useCurrentLocation()
  const onClick = useCallback(() => {
    map.setView([currLocation.latitude, currLocation.longitude], 12)
  }, [map])

  return (
    <IconButton
      color="secondary"
      style={{
        position: 'absolute',
        zIndex: 1000,
        bottom: 'calc(env(safe-area-inset-bottom) + 140px)',
        right: 6,
      }}
      component="span"
      onClick={onClick}>
      <Navigation />
    </IconButton>
  )
}

const LeafletMap = () => {
  const { currLocation } = useCurrentLocation()
  const { availableCoincarts, fullCoincartScheduleList, map, setMap } =
    useHomePageService()

  // useEffect(() => {
  //   console.log('availableCoincarts', availableCoincarts)
  // }, [availableCoincarts])

  const displayMap = React.useMemo(
    () => (
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

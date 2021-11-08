import { MapContainer, TileLayer } from 'react-leaflet'
import React, { useState, useCallback } from 'react'

import { Map as LeafletMapPorps } from 'leaflet'
import { IconButton } from '@mui/material'
import { Navigation } from '@mui/icons-material'
import { useCurrentLocation } from '../utils/xHook'
import { useHomePageService } from '../api/service/home'
import CoincartMarker from './CoincartMarker'
const mapboxStyleUrl = `https://api.mapbox.com/styles/v1/niskan516/ckvja1tgj8qyb18rsvygg4v9z/tiles/256/{z}/{x}/{y}@2x?lang=tc&access_token=${process.env.MAPBOX_KEY}`

const LocateButton = ({ map }: { map: LeafletMapPorps }) => {
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
        bottom: 'calc(env(safe-area-inset-bottom) + 100px)',
        right: 10,
      }}
      component="span"
      onClick={onClick}>
      <Navigation />
    </IconButton>
  )
}

const LeafletMap = () => {
  const { currLocation } = useCurrentLocation()
  const { availableCoincarts, fullCoincartScheduleList } = useHomePageService()
  const [map, setMap] = useState<LeafletMapPorps | null>(null)

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
        whenCreated={setMap}>
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={mapboxStyleUrl}
        />
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

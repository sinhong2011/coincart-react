import { useState, useEffect } from 'react'

export const useCurrentLocation = () => {
  const [currLocation, setCurrLocation] = useState({
    latitude: 22.3161008,
    longitude: 114.1656078,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)
      setCurrLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }, [])

  return { currLocation }
}

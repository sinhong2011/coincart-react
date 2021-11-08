import { useState } from 'react'
import { defaultCenter } from '../constant/map'
import { Coordinate } from '../types/common'
import { getCurrentLocation, isBrowser } from './xCm'

const currentPosition: Coordinate = isBrowser()
  ? JSON.parse(window.localStorage.getItem('currentPosition')!)
  : null

export const useCurrentLocation = () => {
  const [currLocation, setCurrLocation] = useState<Coordinate>(
    currentPosition || defaultCenter
  )

  const initCurrentLocation = async () => {
    const position = await getCurrentLocation()

    if (isBrowser())
      window.localStorage.setItem('currentPosition', JSON.stringify(position))
    setCurrLocation(position || defaultCenter)
  }

  return { currLocation, initCurrentLocation }
}

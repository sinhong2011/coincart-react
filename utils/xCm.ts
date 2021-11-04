import { Coordinate } from '../types/common'
export const isBrowser = () => typeof window !== 'undefined'

export const deviceType = () => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile'
  }
  return 'desktop'
}

export const isMobile = () => deviceType() === 'mobile'
export const isTablet = () => deviceType() === 'mobile'

export const getCurrentLocation = () =>
  new Promise<Coordinate>((reslove, reject) => {
    if (!navigator.geolocation) {
      if (isMobile() || isTablet()) {
        alert('Your browser does not support geolocation')
      } else {
        console.log('Your browser does not support geolocation')
      }
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          //   alert(`${position.coords.latitude},${position.coords.longitude}`)
          reslove({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        error => {
          if (isMobile() || isTablet()) {
            alert(`getCurrentLocation error:\n${error.message}`)
          } else {
            console.log('getCurrentLocation error: ', error.message)
          }
        }
      )
    }
  })

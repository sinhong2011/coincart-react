import { Map } from 'leaflet'
import { I18n } from 'next-i18next'

declare global {
  interface Window {
    map: Map
    i18n: I18n
  }
}

import { Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { CoinCartScheduleDetail } from '../types/apiTypes'

const icon = L.icon({
  iconUrl: '/delivery-truck-delivery-pngrepo-com.png',
  iconSize: [32, 32],
})

type CoincartMarkerProps = {
  coinCart: CoinCartScheduleDetail
}

type ContentProps = {
  title: string
  children: React.ReactNode
  contentCompType?: React.ElementType
}
const Content = ({
  title,
  children,
  contentCompType = 'div',
}: ContentProps): JSX.Element => (
  <div>
    <Typography
      variant="subtitle2"
      component="span">{`${title} : `}</Typography>
    <Typography variant="caption" component={contentCompType}>
      {children}
    </Typography>
  </div>
)

const CoincartMarker = ({ coinCart }: CoincartMarkerProps): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Marker position={[coinCart.latitude, coinCart.longitude]} icon={icon}>
      <Popup>
        <div className="d-flex flex-column">
          <Content title={t('home.cartNo')} contentCompType="span">
            {coinCart.cart_no}
          </Content>
          <Content title={t('home.address')}> {coinCart.address}</Content>
          <Content title={t('home.duration')}>
            {`${coinCart.start_date} ${t('common.to')} ${coinCart.end_date}`}
          </Content>
          <Content title={t('home.district')}> {coinCart.district}</Content>
          <Content title={t('home.remarks')}> {coinCart.remarks}</Content>
        </div>
      </Popup>
    </Marker>
  )
}

export default CoincartMarker

import { Marker } from 'react-leaflet'
import L from 'leaflet'
import * as React from 'react'
import { useTranslation } from 'next-i18next'
import { CoinCartScheduleDetail } from 'types/api-types'
import { BottomSheetContext } from 'context/bottom-sheet/slice'
import { CartDetail } from 'components/CoinCartDetail'
import { useAppConfig } from 'store/hooks'
import { CloseButton, Box, Text } from '@chakra-ui/react'

const getIcon = (className = '') =>
  L.icon({
    className,
    iconUrl: '/delivery-truck-delivery-svgrepo-com.svg',
    iconSize: className === 'focused-coincart' ? [48, 48] : [32, 32],
  })

type CoincartMarkerProps = {
  coinCart: CoinCartScheduleDetail
}

const CartDeatailTitle = () => {
  const { t } = useTranslation()
  const [, { closeBottomSheet }] = React.useContext(BottomSheetContext)
  const { setFocusedCoincart } = useAppConfig()
  return (
    <Box
      display={'flex'}
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text fontWeight={'bold'}>{t('common.detail')}</Text>
      <CloseButton
        size="lg"
        style={{
          position: 'absolute',
          right: -10,
          top: -15,
        }}
        onClick={() => {
          closeBottomSheet?.()
          setFocusedCoincart?.(null)
        }}
      />
    </Box>
  )
}

const CoincartMarker = ({ coinCart }: CoincartMarkerProps): JSX.Element => {
  const [, { openBottomSheet }] = React.useContext(BottomSheetContext)
  const {
    appState: { focusedCoincart },
    setFocusedCoincart,
  } = useAppConfig()

  return (
    <Marker
      position={[coinCart.latitude, coinCart.longitude]}
      icon={getIcon(
        focusedCoincart === coinCart.index ? 'focused-coincart' : ''
      )}
      eventHandlers={{
        click: () => {
          window?.map.setView([coinCart.latitude, coinCart.longitude], 14)
          setFocusedCoincart(coinCart.index)
          openBottomSheet?.({
            title: <CartDeatailTitle />,
            content: <CartDetail coinCart={coinCart} />,
          })
        },
      }}></Marker>
  )
}

export default CoincartMarker

import { useContext } from 'react'
import { CoinCartScheduleDetail } from 'types/api-types'
import { useTranslation } from 'next-i18next'
import { Box, Text, CloseButton } from '@chakra-ui/react'
import { useAppConfig } from 'store/hooks'
import { BottomSheetContext } from 'context/bottom-sheet/slice'

type ContentProps = {
  title: string
  children: React.ReactNode
  horizontal?: boolean
}

export const Content = ({
  title,
  horizontal = false,
  children,
}: ContentProps): JSX.Element => (
  <Box
    display="flex"
    alignItems="baseline"
    flexDirection={horizontal ? 'row' : 'column'}>
    <Box
      color="gray.800"
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="x"
      mr="2">{`${title} : `}</Box>
    <Box>{children}</Box>
  </Box>
)

export const CartDetail = ({
  coinCart,
}: {
  coinCart: CoinCartScheduleDetail
}) => {
  const { t } = useTranslation()
  const { appState } = useAppConfig()

  return (
    <Box p={3}>
      <Content title={t('home.cartNo')} horizontal>
        {coinCart.cart_no}
      </Content>
      <Content title={t('home.address')}>{coinCart.address}</Content>
      <Content title={t('home.duration')}>
        {`${coinCart.start_date} ${t('common.to')} ${coinCart.end_date}`}
      </Content>
      <Content title={t('home.serviceHours')}>{appState.serviceHours}</Content>
      <Content title={t('home.district')}>{coinCart.district}</Content>
      <Content title={t('home.remarks')}>{coinCart.remarks}</Content>
    </Box>
  )
}

export const CartDeatailTitle = () => {
  const { t } = useTranslation()
  const [, { closeBottomSheet }] = useContext(BottomSheetContext)
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

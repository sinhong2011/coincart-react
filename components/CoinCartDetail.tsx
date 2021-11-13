import { CoinCartScheduleDetail } from 'types/apiTypes'
import { useTranslation } from 'next-i18next'

import { Box } from '@chakra-ui/react'

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

  return (
    <Box p={3}>
      <Content title={t('home.cartNo')} horizontal>
        {coinCart.cart_no}
      </Content>
      <Content title={t('home.address')}>{coinCart.address}</Content>
      <Content title={t('home.duration')}>
        {`${coinCart.start_date} ${t('common.to')} ${coinCart.end_date}`}
      </Content>
      <Content title={t('home.district')}>{coinCart.district}</Content>
      <Content title={t('home.remarks')}>{coinCart.remarks}</Content>
    </Box>
  )
}

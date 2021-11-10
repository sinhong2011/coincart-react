import { CoinCartScheduleDetail } from 'types/apiTypes'
import { useTranslation } from 'next-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Variant } from '@mui/material/styles/createTypography'

type ContentProps = {
  title: string
  children: React.ReactNode
  contentCompType?: React.ElementType
  titleVariant?: Variant
  childrenVariant?: Variant
}

export const Content = ({
  title,
  titleVariant = 'subtitle2',
  children,
  contentCompType = 'div',
  childrenVariant = 'caption',
}: ContentProps): JSX.Element => (
  <div>
    <Typography
      variant={titleVariant}
      component="span">{`${title} : `}</Typography>
    <Typography variant={childrenVariant} component={contentCompType}>
      {children}
    </Typography>
  </div>
)

export const CartDetail = ({
  coinCart,
  titleVariant,
  childrenVariant,
}: {
  coinCart: CoinCartScheduleDetail
  titleVariant?: Variant
  childrenVariant?: Variant
}) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ padding: 1, flex: 1 }}>
      <Content
        title={t('home.cartNo')}
        contentCompType="span"
        titleVariant={titleVariant}
        childrenVariant={childrenVariant}>
        {coinCart.cart_no}
      </Content>
      <Content
        title={t('home.address')}
        titleVariant={titleVariant}
        childrenVariant={childrenVariant}>
        {coinCart.address}
      </Content>
      <Content
        title={t('home.duration')}
        titleVariant={titleVariant}
        childrenVariant={childrenVariant}>
        {`${coinCart.start_date} ${t('common.to')} ${coinCart.end_date}`}
      </Content>
      <Content
        title={t('home.district')}
        titleVariant={titleVariant}
        childrenVariant={childrenVariant}>
        {coinCart.district}
      </Content>
      <Content
        title={t('home.remarks')}
        titleVariant={titleVariant}
        childrenVariant={childrenVariant}>
        {coinCart.remarks}
      </Content>
    </Box>
  )
}

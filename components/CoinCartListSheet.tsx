import { BottomSheet } from 'react-spring-bottom-sheet'
import { useTranslation } from 'next-i18next'
import { SheetContent } from 'components/SheetContent'
import { useAppConfig } from 'store/hooks'
import { CoinCartScheduleDetail } from 'types/api-types'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

type CartListItemProps = {
  cartIdx: number
  coinCart: CoinCartScheduleDetail
}

const TableTitleItem = (props: { children: React.ReactNode }) => (
  <Th p="2" fontSize={'18px'}>
    {props.children}
  </Th>
)

const CartListItem = ({ cartIdx, coinCart }: CartListItemProps) => {
  const { t } = useTranslation()
  return (
    <Tr>
      <Td>{coinCart.cart_no}</Td>
      <Td>{coinCart.district}</Td>
      <Td>{`${coinCart.start_date} ${t('common.to')} ${coinCart.end_date}`}</Td>
      <Td>{coinCart.address}</Td>
    </Tr>
  )
}

const CartTable = () => {
  const {
    appState: { availableCoincarts = [] },
  } = useAppConfig()
  const { t } = useTranslation()

  return (
    <Table colorScheme="linkedin" variant="striped" size="sm">
      <Thead>
        <Tr whiteSpace={'nowrap'}>
          <TableTitleItem>{t('home.cartNo')}</TableTitleItem>
          <TableTitleItem>{t('home.district')}</TableTitleItem>
          <TableTitleItem>{t('home.duration')}</TableTitleItem>
          <TableTitleItem>{t('home.address')}</TableTitleItem>
        </Tr>
      </Thead>
      <Tbody>
        {availableCoincarts && availableCoincarts?.length > 0
          ? availableCoincarts?.map((coinCart, cartIdx) => (
              <CartListItem
                key={cartIdx}
                cartIdx={cartIdx}
                coinCart={coinCart}
              />
            ))
          : 'no records...'}
      </Tbody>
    </Table>
  )
}

const CoinCartListSheet = () => {
  const { t } = useTranslation()

  return (
    <BottomSheet
      open={true}
      //   onDismiss={() => setOpen(false)}

      blocking={false}
      header={t('home.coincartList')}
      style={{ zIndex: 9998 }}
      snapPoints={({ maxHeight }) => [52, maxHeight / 1.8]}>
      <SheetContent>
        <CartTable />
      </SheetContent>
    </BottomSheet>
  )
}

export default CoinCartListSheet

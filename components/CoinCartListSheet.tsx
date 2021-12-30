import React, { useState, useEffect } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { useTranslation } from 'next-i18next'
import { SheetContent } from 'components/SheetContent'
import { useAppConfig } from 'store/hooks'
import { CoinCartScheduleDetail } from 'types/api-types'
import {
  List,
  Box,
  ListItem,
  Badge,
  Text,
  HStack,
  Divider,
} from '@chakra-ui/react'
import { sortBy } from 'ramda'
import { useOpenCoincartDetail } from 'utils/xHook'

type CartListItemProps = {
  cartIdx: number
  coinCart: CoinCartScheduleDetail
}

const CardItem = ({ coinCart }: CartListItemProps) => {
  const { t } = useTranslation()
  const { openCoincartDetail } = useOpenCoincartDetail()
  return (
    <ListItem
      _active={{
        opacity: 0.7,
      }}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width={'100%'}
      onClick={() => {
        openCoincartDetail(coinCart)
      }}>
      <Box display="flex" flexDirection={'column'} p="4">
        <Box
          display="flex"
          alignItems="center"
          justifyContent={'space-between'}
          mb="1">
          <HStack>
            <Text color="gray.600" fontWeight="bold" letterSpacing="wide">
              {t('home.cartNo')}
            </Text>
            <Text
              color="gray.600"
              fontWeight="bold"
              letterSpacing="wide"
              textTransform="uppercase"
              ml="1"
              paddingBottom={'2px'}>
              {coinCart.cart_no}
            </Text>
          </HStack>
          <Badge borderRadius="full" px="2" colorScheme="twitter">
            {coinCart.district}
          </Badge>
        </Box>
        <Box>
          <Text color="gray.600" fontWeight="bold" letterSpacing="wide">
            {`${coinCart.start_date} ${t('common.to')} ${coinCart.end_date}`}
          </Text>
          <Divider />
          <Text isTruncated mt="2" userSelect={'none'}>
            {coinCart.address}
          </Text>
        </Box>
      </Box>
    </ListItem>
  )
}

const sortByDate = (list: CoinCartScheduleDetail[]) =>
  sortBy<CoinCartScheduleDetail>(item => item.start_date)(list)

const CoinCartList = () => {
  const {
    appState: { availableCoincarts = [] },
  } = useAppConfig()
  const { t } = useTranslation()
  const [coincartList, setCoincartList] = useState<CoinCartScheduleDetail[]>([])

  useEffect(() => {
    if (Array.isArray(availableCoincarts) && availableCoincarts.length > 0) {
      setCoincartList(sortByDate(availableCoincarts))
    } else {
      setCoincartList([])
    }
  }, [availableCoincarts])

  return Array.isArray(availableCoincarts) && availableCoincarts.length > 0 ? (
    <List spacing={3} padding={2} width={'100%'}>
      {coincartList?.map((coinCart, cartIdx) => (
        <CardItem key={cartIdx} cartIdx={cartIdx} coinCart={coinCart} />
      ))}
    </List>
  ) : (
    <Box
      padding={'6'}
      height={'100%'}
      width={'100%'}
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      fontWeight={'semibold'}>
      {t('home.noData')}
    </Box>
  )
}

const CoinCartListSheet = () => {
  const { t } = useTranslation()

  return (
    <BottomSheet
      open={true}
      blocking={false}
      header={<Box fontWeight={'semibold'}>{t('home.coincartList')}</Box>}
      style={{ zIndex: 9998 }}
      snapPoints={({ maxHeight }) => [52, maxHeight / 2.2]}>
      <SheetContent>
        <CoinCartList />
      </SheetContent>
    </BottomSheet>
  )
}

export default CoinCartListSheet

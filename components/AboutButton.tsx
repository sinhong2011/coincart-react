import * as React from 'react'
import {
  IconButton,
  Box,
  Stack,
  Heading,
  Text,
  HStack,
  Link,
  Divider,
} from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import { BottomSheetContext } from '../context/bottom-sheet/slice'

const Content = () => (
  <Box p="3">
    <Stack m="1">
      <HStack alignItems="flex-end">
        <Heading>CoinCart-Map</Heading>
        <Text>v0.01</Text>
      </HStack>
      <Link color="teal.500" href="mailto:niskna516.dev@gmail.com">
        Blame me
      </Link>
    </Stack>

    <Stack m="1">
      <HStack alignItems="flex-end">
        <Link
          color="teal.500"
          href="https://apidocs.hkma.gov.hk/chi/documentation/coin-cart-schedule/"
          target="_blank">
          Data Source
        </Link>
      </HStack>
    </Stack>
    <Divider />
  </Box>
)

const AboutButton = () => {
  const [, { openBottomSheet }] = React.useContext(BottomSheetContext)
  const openSheet = () => {
    openBottomSheet?.({ title: 'About', content: <Content /> })
  }
  return (
    <IconButton
      aria-label="About me"
      icon={<AiOutlineInfoCircle size="32" />}
      style={{
        position: 'fixed',
        zIndex: 1011,
        left: 11,
        top: 'calc(90px + (env(safe-area-inset-bottom) / 2))',
        background: 'white',
      }}
      size="large"
      onClick={openSheet}
    />
  )
}

export default AboutButton

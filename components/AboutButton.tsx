import * as React from 'react'
import {
  IconButton,
  Box,
  Stack,
  Heading,
  Badge,
  HStack,
  Link,
  Divider,
} from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import { BottomSheetContext } from 'context/bottom-sheet/slice'
import { useTranslation } from 'next-i18next'

const Content = () => {
  const { t } = useTranslation()

  return (
    <Box p="3" width="100%">
      <Stack m="1">
        <HStack alignItems="flex-end">
          <Heading>{t('common.appName')}</Heading>
          <Badge>v1</Badge>
        </HStack>
        <Stack direction="row" h="40px" m={1} mb={2}>
          <Divider orientation="vertical" />
          <Box>{t('common.description')}</Box>
        </Stack>

        <Link
          style={{ marginTop: 15 }}
          color="teal.500"
          href="mailto:niskna516.dev@gmail.com">
          {t('common.feedback')}
        </Link>
      </Stack>

      <Stack m="1" mt="2">
        <HStack alignItems="flex-end">
          <Link
            color="teal.500"
            href="https://apidocs.hkma.gov.hk/chi/documentation/coin-cart-schedule/"
            target="_blank">
            {t('common.dataSource')}
          </Link>
        </HStack>
      </Stack>
      <Divider />
    </Box>
  )
}

const AboutButton = () => {
  const [, { openBottomSheet }] = React.useContext(BottomSheetContext)
  const { t } = useTranslation()

  const openSheet = () => {
    openBottomSheet?.({ title: t('common.about'), content: <Content /> })
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

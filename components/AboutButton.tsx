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
  Text,
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
          <Heading as="h1">{t('common.appName')}</Heading>
          <Badge>v{process.env.APP_VERSION}</Badge>
        </HStack>
        <Stack direction="row" m={1} mb={2}>
          <Divider orientation="vertical" height="auto" />
          <Box>{t('common.aboutContent')}</Box>
        </Stack>

        <Link
          style={{ marginTop: 15 }}
          color="teal.500"
          href="mailto:niskan516.dev@gmail.com">
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

  const title = (
    <Box
      display={'flex'}
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text fontWeight={'bold'}>{t('common.about')}</Text>
    </Box>
  )

  const openSheet = () => {
    openBottomSheet?.({ title, content: <Content />, blocking: true })
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

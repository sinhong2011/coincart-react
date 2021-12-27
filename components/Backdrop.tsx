import { useAppConfig } from 'store/hooks'
import { Spinner, Fade, Text, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Backdrop = () => {
  const { appState } = useAppConfig()
  const { t } = useTranslation()

  return (
    <Fade in={appState.loading} className={'backdrop'} unmountOnExit>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text
          pt="2"
          style={{
            fontSize: 16,
            fontWeight: 600,
          }}
          textAlign={'center'}>
          {t('common.loadingPostion')}
        </Text>
      </Box>
    </Fade>
  )
}

export default Backdrop

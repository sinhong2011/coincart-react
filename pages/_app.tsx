import '../styles/globals.css'
import '../styles/main.scss'
import 'leaflet/dist/leaflet.css'
import NextNprogress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { isBrowser } from 'utils/xCm'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { QueryClient, QueryClientProvider } from 'react-query'

import { BottomSheetProvider } from 'context/bottom-sheet/provider'
import { useAppConfig } from 'store/hooks'
import { wrapper } from 'store/index'
import 'react-spring-bottom-sheet/dist/style.css'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

function CoinCartApp({ Component, pageProps }: AppProps) {
  const [docLoader, setDocLoader] = useState<HTMLElement | null>(null)
  const appConfig = useAppConfig()
  const router = useRouter()
  const { t } = useTranslation()

  const removeLoader = () => {
    setDocLoader(null)
  }

  useEffect(() => {
    if (isBrowser()) {
      setDocLoader(document.getElementById('document_loader'))

      if (['/404'].includes(router.pathname)) {
        return
      }
      appConfig.initApp()
    }
  }, [])

  useEffect(() => {
    if (!docLoader) return () => undefined
    docLoader.classList.add('out')
    docLoader.addEventListener('transitionend', removeLoader)
    docLoader.addEventListener('webkittransitionend', removeLoader)

    return () => {
      docLoader.removeEventListener('transitionend', removeLoader)
      docLoader.removeEventListener('webkittransitionend', removeLoader)
    }
  }, [docLoader])

  return (
    <>
      <Head>
        <meta name="description" content={t('common.description')} />
        <meta name="keywords" content={t('common.keywords')} />
        <link
          rel="alternate"
          href={`${process.env.REACT_APP_PUBLIC_URL}`}
          hrefLang="x-default"
        />
        <link
          rel="alternate"
          href={`${process.env.REACT_APP_PUBLIC_URL}/sc}`}
          hrefLang="zh-Hans"
        />
        <link
          rel="alternate"
          href={`${process.env.REACT_APP_PUBLIC_URL}/en`}
          hrefLang="en"
        />

        <title>{t('common.appTitle') || process.env.REACT_APP_TITLE}</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#317EFB" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, 
user-scalable=no"
        />
      </Head>
      <NextNprogress
        color="rgba(250,225,180,0.9)"
        startPosition={0.3}
        stopDelayMs={300}
        height={3}
        options={{ showSpinner: false, easing: 'ease', speed: 500 }}
        showOnShallow
      />

      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <BottomSheetProvider>
            <div className="_app-container">
              <Component {...pageProps} />
            </div>
          </BottomSheetProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}
export default wrapper.withRedux(appWithTranslation(CoinCartApp))

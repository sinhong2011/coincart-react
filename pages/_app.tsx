import '../styles/globals.css'
import '../styles/main.scss'
import 'leaflet/dist/leaflet.css'
import NextNprogress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { isBrowser } from 'utils/xCm'
import { i18n, appWithTranslation } from 'next-i18next'
import { ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import BottomNavBar from '../components/BottomNavBar'
import { useAppConfig } from '../store/hooks'
import { themes } from '../constant/theme'
import { wrapper } from '../store/index'

const queryClient = new QueryClient()

function CoinCartApp({ Component, pageProps }: AppProps) {
  const [docLoader, setDocLoader] = useState<HTMLElement | null>(null)
  const appConfig = useAppConfig()
  const router = useRouter()

  const removeLoader = () => {
    setDocLoader(null)
  }

  useEffect(() => {
    if (isBrowser()) {
      setDocLoader(document.getElementById('document_loader'))

      appConfig.initApp()

      window.i18n = i18n
    }
  }, [])

  useEffect(() => {
    if (docLoader) {
      docLoader.classList.add('out')
      docLoader.addEventListener('transitionend', removeLoader)
      docLoader.addEventListener('webkittransitionend', removeLoader)
    }

    return () => {
      docLoader?.removeEventListener('transitionend', removeLoader)
      docLoader?.removeEventListener('webkittransitionend', removeLoader)
    }
  }, [docLoader])

  useEffect(() => {
    router.push(router.route, router.route, {
      locale: appConfig.appState.language,
    })
  }, [appConfig.appState.language])

  return (
    <>
      <Head>
        <title>{process.env.REACT_APP_TITLE}</title>
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

      <ThemeProvider theme={themes[appConfig.appState.mode]}>
        <QueryClientProvider client={queryClient}>
          <div className="_app-container">
            <Component {...pageProps} />
            <BottomNavBar />
          </div>
        </QueryClientProvider>
        <CssBaseline />
      </ThemeProvider>
    </>
  )
}
export default wrapper.withRedux(appWithTranslation(CoinCartApp))

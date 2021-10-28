import '../styles/globals.css'
import '../styles/main.scss'
import NextNprogress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { isBrowser } from 'utils/xCm'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import BottomNavBar from '../components/BottomNavBar'
import { useAppConfig } from '../store/hooks'
import { themes } from '../constant/theme'
import { wrapper } from '../store/index'

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
    }
  }, [isBrowser()])

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
        <title>CoinCart</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#317EFB" />
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
        <div className="_app-container">
          <Component {...pageProps} />
          <BottomNavBar />
        </div>
      </ThemeProvider>
    </>
  )
}
export default wrapper.withRedux(appWithTranslation(CoinCartApp))

import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { isBrowser } from 'utils/xCm'
import BottomNavBar from '../components/BottomNavBar'

function MyApp({ Component, pageProps }: AppProps) {
  const [docLoader, setDocLoader] = useState<HTMLElement | null>(null)

  const removeLoader = () => {
    setDocLoader(null)
  }

  useEffect(() => {
    if (isBrowser()) {
      setDocLoader(document.getElementById('document_loader'))

      // loaderRef.current?.ontransitionend.
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
      <div className="_app-container">
        <Component {...pageProps} />
        <BottomNavBar />
      </div>
    </>
  )
}
export default MyApp

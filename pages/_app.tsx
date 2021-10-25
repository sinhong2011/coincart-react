import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <title>CoinCart</title>
      <div className="_app-container">
        <Component {...pageProps} />
      </div>
    </>
  )
}
export default MyApp

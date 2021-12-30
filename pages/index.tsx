import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Languangs } from 'types/i18n'

import { useCurrentLocation } from 'utils/xHook'
import DistrictFilter from 'components/DistrictFilter'
import { LanguageSelector } from 'components/LanguageSelector'
import AboutButton from 'components/AboutButton'
import { useAppConfig } from 'store/hooks'
import Backdrop from 'components/Backdrop'
import CoinCartListSheet from '../components/CoinCartListSheet'

const Map = dynamic(
  () => import('components/LeafletMap'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)

const HomePage: NextPage = () => {
  const { getCoinCartSchedule, appState } = useAppConfig()

  const { initCurrentLocation } = useCurrentLocation()

  useEffect(() => {
    if (appState.initiaized) {
      initCurrentLocation()

      getCoinCartSchedule()
    }
  }, [appState.initiaized])

  if (!appState.initiaized) {
    return null
  }

  return (
    <div className="page-container" style={{}}>
      <DistrictFilter />
      <LanguageSelector />
      <AboutButton />
      <Map />
      <Backdrop />
      <CoinCartListSheet />
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: Languangs }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  }
}

export default HomePage

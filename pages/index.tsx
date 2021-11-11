import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Languangs } from 'types/i18n'
import { useHomePageService } from 'api/service/home'
import { useCurrentLocation } from 'utils/xHook'
import DistrictFilter from '../components/DistrictFilter'
import CoincartIDetailListDrawer from '../components/CoincartIDetailListDrawer'

const Map = dynamic(
  () => import('components/LeafletMap'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)

const HomePage: NextPage = () => {
  const { getCoinCartSchedule } = useHomePageService()
  const [isBrowser, setIsBrowser] = useState(false)

  const { initCurrentLocation } = useCurrentLocation()

  useEffect(() => {
    initCurrentLocation()

    getCoinCartSchedule()
  }, [])

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
    return null
  }

  return (
    <div className="page-container" style={{}}>
      <DistrictFilter />
      <Map />
      <CoincartIDetailListDrawer />
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

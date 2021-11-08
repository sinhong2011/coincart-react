import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Languangs } from 'types/i18n'
import { useHomePageService } from 'api/service/home'
import { useCurrentLocation } from 'utils/xHook'
import Select from 'react-select'
import CoincartIDetailListDrawer from '../components/CoincartIDetailListDrawer'
import { DistrictOption } from '../types/common'

const Map = dynamic(
  () => import('components/LeafletMap'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)

const HomePage: NextPage = () => {
  const {
    getCoinCartSchedule,
    districtOptions,
    selectedDistrics,
    setSelectedDistrics,
  } = useHomePageService()
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
      <div
        style={{
          position: 'absolute',
          zIndex: 1000,
          top: 'calc(env(safe-area-inset-top) + 12px)',
          left: 60,
          width: '80%',
        }}>
        <Select
          name="districs"
          isMulti
          value={selectedDistrics}
          onChange={newValue => {
            setSelectedDistrics(newValue as DistrictOption[])
          }}
          options={districtOptions || []}
          className="basic-multi-select"
          classNamePrefix="select"
          autoFocus={false}
          isSearchable={false}
        />
      </div>
      <CoincartIDetailListDrawer />
      <Map />
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

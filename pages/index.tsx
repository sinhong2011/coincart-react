import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Languangs } from 'types/i18n'
import { useHomePageService } from 'pages/home/service'
import { useCurrentLocation } from 'utils/xHook'
import { OnChangeValue, ActionMeta } from 'react-select'
import { DistrictOption } from 'types/common'

const HomePage: NextPage = () => {
  const {
    getCoinCartSchedule,
    districtOptions,
    selectedDistrics,
    setSelectedDistrics,
  } = useHomePageService()
  const [isBrowser, setIsBrowser] = useState(false)

  const Map = dynamic(
    () => import('components/LeafleftMap'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )

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

  const onSelectedDistricChanget = (
    value: OnChangeValue<DistrictOption[], true>,
    actionMeta: ActionMeta<DistrictOption[]>
  ) => {
    console.log('value', value)
    setSelectedDistrics(value)
  }

  return (
    <div className="page-container" style={{}}>
      {/* <div
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
          onChange={onSelectedDistricChanget}
          options={districtOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <IconButton
        color="secondary"
        style={{
          position: 'absolute',
          zIndex: 1000,
          bottom: 'calc(env(safe-area-inset-bottom) + 100px)',
          right: 10,
        }}
        component="span"
        onClick={() => {
          initCurrentLocation()
        }}>
        <Navigation />
      </IconButton> */}
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

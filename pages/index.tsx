import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Languangs } from '../types/i18n'
import { useHomePageService } from './home/service'

const HomePage: NextPage = () => {
  const { getCoinCartSchedule } = useHomePageService()
  const [isBrowser, setIsBrowser] = useState(false)

  const Map = dynamic(
    () => import('components/LeafleftMap'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )

  useEffect(() => {
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

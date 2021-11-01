import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { Languangs } from '../types/i18n'
import { useHomePageService } from './home/service'

const HomePage: NextPage = () => {
  const { getCoinCartSchedule } = useHomePageService()

  useEffect(() => {
    getCoinCartSchedule()
  }, [])

  return <div>Home Page</div>
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

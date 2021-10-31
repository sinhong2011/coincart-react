import { Grid } from '@mui/material'

import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Languangs } from 'types/i18n'
import { useEffect } from 'react'
import { useCoincartSummaryService } from 'pages/dashboard/service'
import AnimatedCard from 'components/AnimatedCard'
import { useTranslation } from 'next-i18next'

const DashboardPage: NextPage = () => {
  const { t } = useTranslation()
  const { getCoincartSummary, isFetching, coincartSummary } =
    useCoincartSummaryService()

  useEffect(() => {
    getCoincartSummary()
  }, [])

  return (
    <div className="page-container" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <AnimatedCard
            title={t('dashboard.transactions')}
            content={coincartSummary?.transaction}
          />
        </Grid>
        <Grid item xs={4}>
          <AnimatedCard
            title={t('dashboard.collectedCoins')}
            content={coincartSummary?.coins}
          />
        </Grid>
        <Grid item xs={5}>
          <AnimatedCard
            title={t('dashboard.totalValue')}
            content={coincartSummary?.totalCost}
          />
        </Grid>
        <Grid item xs={7}></Grid>
      </Grid>
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

export default DashboardPage

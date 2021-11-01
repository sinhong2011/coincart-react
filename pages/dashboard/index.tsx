import { Grid } from '@mui/material'

import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Languangs } from 'types/i18n'
import { useEffect } from 'react'
import { useCoincartSummaryService } from 'pages/dashboard/service'
import AnimatedCard from 'components/AnimatedCard'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import { Spring } from 'framer-motion'

const DashboardPage: NextPage = () => {
  const { t } = useTranslation()
  const { getCoincartSummary, isFetching, coincartSummary } =
    useCoincartSummaryService()

  useEffect(() => {
    getCoincartSummary()
  }, [])

  const spring: Spring = {
    type: 'spring',
    damping: 10,
    stiffness: 100,
    duration: 0.6,
    delay: 0,
    restDelta: 0.1,
    bounce: 1,
  }

  return (
    <div className="page-container" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AnimatedCard
            isLoading={isFetching}
            title={t('dashboard.startDate')}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1, transition: { ...spring } }}>
            {coincartSummary?.startDate}
          </AnimatedCard>
        </Grid>
        <Grid item xs={6}>
          <AnimatedCard
            isLoading={isFetching}
            title={t('dashboard.endDate')}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,

              transition: { ...spring, delay: 0.2 },
            }}>
            {dayjs().format('YYYY-MM-DD')}
          </AnimatedCard>
        </Grid>
        <Grid item xs={6}>
          <AnimatedCard
            isLoading={isFetching}
            title={t('dashboard.transactions')}
            countUp={coincartSummary?.transaction}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { ...spring, delay: 0.4 },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AnimatedCard
            isLoading={isFetching}
            title={t('dashboard.collectedCoins')}
            countUp={coincartSummary?.coins}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { ...spring, delay: 0.6 },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <AnimatedCard
            isLoading={isFetching}
            title={t('dashboard.totalValue')}
            countUp={coincartSummary?.totalCost}
            countupPrefix="$"
            contentStyle={{ fontSize: 28 }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,

              transition: { ...spring, delay: 0.8 },
            }}
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

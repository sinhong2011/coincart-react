import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { NextPage } from 'next'
import { Languangs } from 'types/i18n'
import { useEffect } from 'react'
import { useCoincartSummaryService } from 'api/service/dashboard'

import { useTranslation } from 'next-i18next'
import { Spring } from 'framer-motion'
import dayjs from 'dayjs'
import {
  Grid,
  GridItem,
  Box,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
} from '@chakra-ui/react'

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
    <div className="page-container">
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}>
        <GridItem colSpan={3}>
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="2"
            bg="papayawhip">
            <Stat>
              <StatLabel>{t('dashboard.collectedCoins')}</StatLabel>
              <StatNumber>{coincartSummary?.coins}</StatNumber>
              <StatHelpText>{`${coincartSummary?.startDate} - ${dayjs().format(
                'YYYY-MM-DD'
              )}`}</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={4} bg="tomato" />
      </Grid>

      {/* <Box item xs={6}>
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
        </Box>
        <Box item xs={6}>
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
        </Box>
        <Box item xs={6}>
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
        </Box>
        <Box item xs={12}>
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
        </Box>
        <Box item xs={7}></Box> */}
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

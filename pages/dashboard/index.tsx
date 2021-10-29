import { Grid, Paper, Theme } from '@mui/material'
import { styled } from '@mui/system'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Languangs } from 'types/i18n'
import { useEffect } from 'react'
import { useCoincartSummaryService } from './service'

const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const DashboardPage: NextPage = () => {
  const { getCoincartSummary, isFetching, coincartSummary } =
    useCoincartSummaryService()

  useEffect(() => {
    getCoincartSummary()
  }, [])

  return (
    <div className="page-container" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper>{coincartSummary?.coins}</Paper>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
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

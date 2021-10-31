import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import xApiClient from '../../api/xApi'
import { appActions } from '../../store/app'

export const useCoincartSummaryService = () => {
  const appState = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()
  const { error, isFetching, data, refetch } = useQuery(
    '',
    () => xApiClient.getDashboard(),
    {
      enabled: false,
    }
  )

  useEffect(() => {
    if (!isFetching && data && data.result) {
      console.log('data.result', data.result)
      dispatch(appActions.getCoincartSummary(data.result))
    }
  }, [isFetching, data])

  const getCoincartSummary = () => {
    if (appState.coincartSummary) return
    refetch()
  }

  return {
    getCoincartSummary,
    isFetching,
    error,
    coincartSummary: appState.coincartSummary,
  }
}

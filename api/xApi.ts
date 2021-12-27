import axios from 'axios'

import {
  GetCoinCartScheduleRequest,
  GetCoinCartScheduleResponse,
  ApiParamsLangs,
} from 'types/api-types'

const xApiClient = {
  client: axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    headers: {
      'content-type': 'application/json',
    },
  }),

  async getCoinCartServiceHours(params: { lang: ApiParamsLangs }) {
    return xApiClient.client.get<
      { lang: ApiParamsLangs },
      { serviceHours: string }
    >('/getServiceHours', {
      params,
      baseURL: '/api',
    })
  },
  async getCoinCartSchedule(params: GetCoinCartScheduleRequest) {
    return xApiClient.client.get<
      GetCoinCartScheduleRequest,
      GetCoinCartScheduleResponse
    >('/coin-cart-schedule', { params })
  },
}

export default xApiClient

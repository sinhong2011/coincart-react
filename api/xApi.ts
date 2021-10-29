import {
  GetCoinCartRequest,
  GetCoinCartResponse,
  GetDashboardRsponse,
} from 'types/apiTypes'
import { XHttpClient } from 'utils/xHttpClient'

class XApi extends XHttpClient {
  public async getCoinCartSchedule(params: GetCoinCartRequest) {
    return this.instance.get<GetCoinCartRequest, GetCoinCartResponse>(
      '/coin-cart-schedule',
      { params }
    )
  }

  public getDashboard(): Promise<GetDashboardRsponse> {
    return this.instance.get('api/dashboard', {
      baseURL: '/',
    })
  }
}

const xApiClient = new XApi({
  baseURL: 'https://api.hkma.gov.hk/public',
  headers: {
    'content-type': 'application/json',
  },
})

export default xApiClient

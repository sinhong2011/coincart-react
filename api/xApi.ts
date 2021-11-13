import { GetCoinCartRequest, GetCoinCartResponse } from 'types/apiTypes'
import { XHttpClient } from 'utils/xHttpClient'

class XApi extends XHttpClient {
  public async getCoinCartSchedule(params: GetCoinCartRequest) {
    return this.instance.get<GetCoinCartRequest, GetCoinCartResponse>(
      '/coin-cart-schedule',
      { params }
    )
  }
}

const xApiClient = new XApi({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    'content-type': 'application/json',
  },
})

export default xApiClient

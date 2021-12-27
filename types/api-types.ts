export type ResponseFactory<TRecords> = {
  header: {
    success: boolean
    err_code: '0000'
    err_msg: string
  }
  result: {
    datasize: number
    records: TRecords
  }
}

export type CoinCartScheduleDetail = {
  start_date: string
  end_date: string
  cart_no: number
  district: string
  address: string
  latitude: number
  longitude: number
  remarks: string
  index: number
}

export type ApiParamsLangs = 'en' | 'tc' | 'sc'

export type GetCoinCartScheduleRequest = {
  lang: ApiParamsLangs
  pagesize?: number
  offset?: number
  fields?: string
  column?: string
  filter?: string
  choose?: string
  from?: string
  to?: string
  sortby?: string
  sortorder?: string
}

export type GetCoinCartScheduleResponse = ResponseFactory<
  CoinCartScheduleDetail[]
>

export type GetCoinCartServiceHoursRequest = { lang: ApiParamsLangs }

export type GetCoinCartServiceHoursResponse = { serviceHours: string }

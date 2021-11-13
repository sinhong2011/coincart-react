import { Languangs } from 'types/i18n'

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

export type GetCoinCartRequest = {
  lang: Languangs
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

export type GetCoinCartResponse = ResponseFactory<CoinCartScheduleDetail[]>

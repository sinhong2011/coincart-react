import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// declare module 'axios' {
//   interface AxiosResponse<T = any> extends Promise<T> {}
// }

export abstract class XHttpClient {
  protected readonly instance: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  private _handleRequest = (config: AxiosRequestConfig) => config

  private _handleResponse = ({ data }: AxiosResponse) => data

  protected _handleError = (error: any) =>
    // console.log('error >>> ', error.response)
    Promise.reject(error)
}

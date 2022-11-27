import axios from 'axios'
import { ServiceResponse, IParamObject } from 'shared'
import queryString from 'query-string'

const HOST = 'http://localhost:3001/api'
const instance = axios.create({
  baseURL: HOST,
})

export class API {
  static async get<T>(url: string, params: IParamObject): Promise<T> {
    const response: ServiceResponse = await instance
      .get(
        queryString.stringifyUrl({
          url,
          query: params,
        })
      )
      .then((response) => response.data)
    if (response.status === 'success') {
      return response.data as T
    } else throw new Error(`${response.error}`)
  }

  static async post<T>(url: string, body: IParamObject): Promise<T> {
    const response: ServiceResponse = await instance.post(url, body).then(res => res.data)
    if (response.status === 'success') {
      return response.data as T
    } else throw new Error(`${response.error}`)
  }
}

import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from "axios"
import { Dispatch, SetStateAction } from "react"
import { ResponseError } from "../models/response/ErrorRespose"

const API_URL = 'http://localhost:4000'

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 3000
})

http.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {} as AxiosRequestHeaders
  const login = localStorage.getItem('auth')
  if (login) {
    config.headers.Authentification = `Bearer ${login}`
  }
  return config;
})



//! Потом надо вынести в какой-нибудь другой файл, пока непонятно какой
export function responseErrorHandler(
  err: any | unknown,
  callback: Dispatch<SetStateAction<string | null>>
) {
  const error = err as Error | AxiosError<ResponseError>
  console.error(error)
  let errorMessage = 'Unexpected error, try again later...'

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message ?? error.message
    return callback(errorMessage)
  }

  throw error
}



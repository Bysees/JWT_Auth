import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from "axios"
import { responseErrorHandler } from "./responseErrorHandler"

export const API_URL = 'http://localhost:4000'

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 3000
})

const interceptorRequest = (config: AxiosRequestConfig) => {
  config.headers = config.headers as AxiosRequestHeaders
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}

const interceptorResponse = (config: AxiosRequestConfig) => config

const interceptorResponseError = async (err: AxiosError) => {
  const originalRequst = err.config
  if (err.response?.status === 401 && originalRequst) {
    try {
      const { data } = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
      localStorage.setItem('token', data.token)

      return http.request(originalRequst)
    } catch (err) {
      responseErrorHandler(err)
    }
  }

  throw err
}

http.interceptors.request.use(interceptorRequest)
http.interceptors.response.use(interceptorResponse, interceptorResponseError)


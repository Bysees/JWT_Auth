import axios, { AxiosError, AxiosRequestConfig } from "axios"

export const http = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 3000
})

const interceptor = (config: AxiosRequestConfig) => {
  const login = localStorage.getItem('auth')

  if (login) {
    config.headers = {
      'Authorization': `Bearer ${login}`
    }
  }
  return config
}

http.interceptors.request.use(interceptor)


export type ResponseErrorType = { message?: string }

export function axiosErrorHandler(error: AxiosError<ResponseErrorType>): string {
  let errorMessage = 'Failed to make a request'

  if (error.response) {
    errorMessage = error.response.data?.message ?? errorMessage
  }

  return errorMessage
}
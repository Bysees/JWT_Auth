import axios, { AxiosResponse, AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import { axiosErrorHandler, ResponseErrorType } from '../api';

type ErrorType = string | null
type ReturnHookType<T> = [T, ErrorType, Dispatch<SetStateAction<T>>]
type FetchType<T> = () => Promise<AxiosResponse<T>>


export function useFetch<T>(fetchCallback: FetchType<T>, initial: T): ReturnHookType<T> {
  const [state, setState] = useState<T>(initial)
  const [error, setError] = useState<ErrorType>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCallback()
        setState(response.data)
      } catch (err) {
        console.error(err)

        if (axios.isAxiosError(err)) {
          let errMessage = axiosErrorHandler(err as AxiosError<ResponseErrorType>)
          return setError(errMessage)
        }

        throw err
      }
    }

    fetchData()
  }, [fetchCallback])

  return [state, error, setState]
}


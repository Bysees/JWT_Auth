import { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { responseErrorHandler } from "../http/responseErrorHandler"

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
        const errMessage = responseErrorHandler(err)
        setError(errMessage)
      }
    }

    fetchData()
  }, [fetchCallback])

  return [state, error, setState]
}
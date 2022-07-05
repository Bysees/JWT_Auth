import React, { FC, ReactNode, useLayoutEffect, useState } from "react";
import { responseErrorHandler } from "../http/responseErrorHandler";
import { AuthService } from "../services/AuthService";
import { AuthRequst } from "../models/request/AuthRequest";


type Auth = {
  login: string,
  isLoginned: boolean,
}

interface IAuthContext {
  auth: Auth
  doLogin: (query: 'login' | 'registration', authData: AuthRequst) => Promise<string | undefined>
  doLogout: () => Promise<void>
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);


interface Props {
  children: ReactNode
}

//! Потом вынести в components или куда?
const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, setAuthState] = useState<Auth>({
    login: '',
    isLoginned: false,
  })

  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const { data: { login, token: newToken } } = await AuthService.check()
        localStorage.setItem('token', newToken)

        setAuthState({
          login,
          isLoginned: true
        })
      } catch (err) {
        responseErrorHandler(err)
      }
    }

    checkAuth()
  }, [])


  const doLogin = async (query: 'login' | 'registration', authData: AuthRequst) => {
    try {
      const { data: { token, login } } = await AuthService[query](authData)
      localStorage.setItem('token', token)
      setAuthState({ login, isLoginned: true })
    } catch (err) {
      return responseErrorHandler(err)
    }
  }

  const doLogout = async () => {
    try {
      await AuthService.logout()
      setAuthState({ login: '', isLoginned: false })
      localStorage.removeItem('token')
    } catch (err) {
      responseErrorHandler(err)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, doLogin, doLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
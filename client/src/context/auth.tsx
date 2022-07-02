import React, { FC, ReactNode, useEffect, useState } from "react";
import { AuthService } from "../api/AuthService";
import jwt_decode from "jwt-decode";
import { IUser } from "../models/IUser";


type Auth = {
  login: string,
  isLoginned: boolean,
}

interface IAuthContext {
  auth: Auth
  doLogin: (token: string) => void
  doLogout: () => void
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);


interface Props {
  children: ReactNode
}

//! Потом вынести в components
const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, setAuthState] = useState<Auth>({
    login: '',
    isLoginned: false,
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const response = await AuthService.check()
        localStorage.setItem('token', response.data.token)
        const { login } = jwt_decode<IUser>(response.data.token)

        setAuthState({
          login,
          isLoginned: true
        })
      } catch (err) {
        console.log(err)
      }
    }

    checkAuth()
  }, [])

  const doLogin = (token: string) => {
    localStorage.setItem('token', token)
    const { login } = jwt_decode<IUser>(token)
    setAuthState({ login, isLoginned: true })
  }

  const doLogout = () => {
    setAuthState({ login: '', isLoginned: false })
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ auth, doLogin, doLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
import React, { FC, ReactNode, useEffect, useState } from "react";

type Auth = {
  login: string,
  isLoginned: boolean,
}

interface IAuthContext {
  auth: Auth
  doLogin: (login: string) => void
  doLogout: () => void
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

interface Props {
  children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {

  const [auth, setAuthState] = useState<Auth>({
    login: '',
    isLoginned: false,
  })

  useEffect(() => {
    const storageLogin = localStorage.getItem('auth')

    if (storageLogin) {
      setAuthState({
        login: storageLogin,
        isLoginned: true
      })
    }
  }, [])

  const doLogin = (login: string) => {
    setAuthState({ login, isLoginned: true })
    localStorage.setItem('auth', login)
  }

  const doLogout = () => {
    setAuthState({ login: '', isLoginned: false })
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ auth, doLogin, doLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
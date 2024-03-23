import { type ReactNode, createContext, useState } from 'react'
import { IResponseEntity } from '@/domain/interfaces/IResponseEntity'
import { IUserAuthRequestDTO } from '@/domain/User/dto/IUserAuthDTO'
import { IUserResponseDTO } from '@/domain/User/dto/IUserDTO'
import React from 'react'

interface AuthContextProps {
  isAuth: boolean
  user: IUserResponseDTO | null
  signIn: (register: number, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)
const { Provider } = AuthContext

export function AuthProvider ({ children }: { children: ReactNode }) {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState<IUserResponseDTO | null>(null)

  async function signIn (register: number, password: string) {
    const userDataRequest = await window.app.invoke<IResponseEntity<IUserResponseDTO>, IUserAuthRequestDTO>(
      'auth',
      {register, password}
    )

    if(userDataRequest.error) {
      throw new Error(userDataRequest.message)
    }

    setUser(userDataRequest.data)
    setAuth(true)

  }

  function signOut () {
    setAuth(false)
    setUser(null)
  }

  return (
    <Provider value={{
      isAuth,
      user,
      signIn,
      signOut,
    }}>
      {children}
    </Provider>
  )
}

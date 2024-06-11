import React, { type ReactNode, createContext, useState } from 'react'
import { IResponseEntity } from '@/domain/interfaces/IResponseEntity'
import { IUserResponseDTO } from '@/domain/entities/User/dto/IUserDTO'
import { IUserAuthRequestDTO } from '@/domain/entities/User/dto/IUserAuthDTO'
import { UserRole } from '@/domain/entities/User/UserRoules'

interface AuthContextProps {
  isAuth: boolean
  user: IUserResponseDTO | null
  signIn: (register: number, password: string) => Promise<void>
  signOut: () => void
  verifyUserPermisson: (userRole: IUserResponseDTO["roule"]) => boolean
}

export const AuthContext = createContext({} as AuthContextProps)
const { Provider } = AuthContext

export function AuthProvider ({ children }: { children: ReactNode }) {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState<IUserResponseDTO | null>(null)

  function verifyUserPermisson(userRole?: UserRole){
    if(user.roule === UserRole.ROOT){
      return true
    }
    if(userRole){
      return userRole === user.roule
    }
    return true
  }

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
    console.log(userDataRequest.data)
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
      verifyUserPermisson
    }}>
      {children}
    </Provider>
  )
}

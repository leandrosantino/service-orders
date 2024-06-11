import React from 'react'
import { Route, Router } from 'electron-router-dom'

import { Layout } from './components/Layout'
import { UserRole } from '@/domain/entities/User/UserRoules'
import { RequireAuth } from './RequireAuth'
import { SignIn } from './screens/signIn'
import { UserInfo } from './screens/userInfo'
import { Home } from './screens/home'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" Component={Layout} >

            <Route path="/signIn" element={<SignIn />} />
            <Route element={<RequireAuth />} >

              <Route path="" element={<Home/>} />
              <Route path="/serviceOrders" element={<h1>Teste</h1>} />
              <Route path="/preventiveActions" element={<>preventiveActions</>} />
              <Route path="/settings" element={<>config</>} />
              <Route path="/userinfo" element={<UserInfo/>} />

              <Route path="/admin">
                <Route path="users" element={<>users</>} />
                <Route path="machines" element={<>machines</>} />
              </Route>

            </Route>

          </Route>
        </>
      }
    />
  )
}

export interface ScreensProps {
  name: string;
  path: string;
  show: boolean;
  subPaths?: ScreensProps[];
}

export function getScreensProps(userRole: UserRole, isAuth: boolean){
  return [
    {
      name: 'Dashboard',
      path: '/',
      show: isAuth
    },
    {
      name: 'Orderns de Serviço',
      path: '/serviceOrders',
      show: isAuth
    },
    {
      name: 'Ações Preventivas',
      path: '/preventiveActions',
      show: userRole == UserRole.ADMIN
    },
    {
      name: 'Admin',
      path: '/admin',
      show: userRole == UserRole.ADMIN,
      subPaths: [
        {name: 'Usuários', path: '/users', show: true},
        {name: 'Máquinas', path: '/machines', show: true},
      ]
    },
  ]
}

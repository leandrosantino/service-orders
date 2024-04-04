import React from 'react'
import { Route, Router } from 'electron-router-dom'

import { Home } from '@/view/screens/Home'
import { Test } from '@/view/screens/Test'
import { Layout } from './components/Layout'
import { UserRole } from 'test'
import { RequireAuth } from './RequireAuth'
import { SignIn } from './screens/SignIn'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" Component={Layout} >

            <Route path="/signIn" element={<SignIn />} />
            <Route element={<RequireAuth />} >

              <Route path="" element={<Home />} />
              <Route path="/serviceOrders" element={<Test />} />
              <Route path="/preventiveActions" element={<>preventiveActions</>} />
              <Route path="/settings" element={<>config</>} />
              <Route path="/profile" element={<>profile</>} />

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

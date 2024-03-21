import React from 'react'
import { Route, Router } from 'electron-router-dom'

import { Home } from '@/view/screens/Home'
import { Test } from '@/view/screens/Test'
import { Layout } from './components/Layout'
import { UserRole } from '@/domain/User/UserRoules'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" Component={Layout} >
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

export function getScreensProps(userRole: UserRole){
  return [
    {
      name: 'Dashboard',
      path: '/',
      show: true
    },
    {
      name: 'Orderns de Serviço',
      path: '/serviceOrders',
      show: true
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

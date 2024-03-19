import React from 'react'
import { Route, Router } from 'electron-router-dom'

import { Home } from '@/view/screens/Home'
import { Test } from '@/view/screens/Test'
import { Layout } from './components/Layout'

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

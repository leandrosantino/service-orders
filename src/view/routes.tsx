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
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/test" element={<Layout><Test /></Layout>} />
        </>
      }
    />
  )
}

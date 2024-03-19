import React from 'react'
import { Router, Route } from 'electron-router-dom'

import { Home } from '@/view/screens/Home'
import { Test } from '@/view/screens/Test'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </>
      }
    />
  )
}

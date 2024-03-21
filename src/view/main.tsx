import React from 'react'
import {createRoot} from 'react-dom/client'
import './styles/global.css'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/authContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <AppRoutes/>
  </AuthProvider>
)

import React from 'react'
import {createRoot} from 'react-dom/client'
import './styles/global.css'
import { AppRoutes } from './routes'
import { Layout } from './components/Layout'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <AppRoutes/>
    </Layout>
  </React.StrictMode>
)

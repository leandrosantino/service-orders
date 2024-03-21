import React from 'react'
import {createRoot} from 'react-dom/client'
import './styles/global.css'
import { AppRoutes } from './routes'

createRoot(document.getElementById('root') as HTMLElement).render(
 <AppRoutes/>
)

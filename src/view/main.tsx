import React from 'react'
import {createRoot} from 'react-dom/client'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/authContext'
import { ThemeModeProvider } from './contexts/themeContext.js'
import { SideBarContextProvider } from './contexts/sideBarContext.js'
import { GlobalStyle } from './styles/global'

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeModeProvider>
    <AuthProvider>

        <SideBarContextProvider>
          <GlobalStyle />
          <AppRoutes />
        </SideBarContextProvider>

    </AuthProvider>
  </ThemeModeProvider>
)

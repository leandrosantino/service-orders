import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { useAuth } from '../../hooks/useAuth'
import { Outlet } from 'react-router-dom'
import { Main } from './style'
import React from 'react'

export function Layout () {
  const { isAuth } = useAuth()

  return (
    <Main isAuth={isAuth ? 'true' : 'false'}>
      <Header />
      {isAuth && <>
        <Sidebar />
      </>}
      <section>
        <Outlet />
      </section>
    </Main>
  )
}

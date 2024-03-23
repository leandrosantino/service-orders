import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import React from 'react'


export function RequireAuth () {
  const { isAuth } = useAuth()
  const location = useLocation()

  return (
    <>{
      isAuth
        ? <Outlet />
        : <Navigate to='/signIn' state={{ from: location }} replace />
    }</>
  )
}

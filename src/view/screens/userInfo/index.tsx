import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { ScreenContainer } from '@/view/components/containers/ScreenContainer'

export function UserInfo () {
  const { user } = useAuth()

  return (
    <ScreenContainer>
      <h2>Informações do Usuario</h2>
      <div>
        <p>
          <span>Nome:</span> {user?.firstName} {user?.lastName}
        </p>
        <p>
          <span>Matrícula:</span> {user?.register}
        </p>
        <p>
          <span>Permissão:</span> {user?.roule}
        </p>
      </div>
    </ScreenContainer>
  )
}

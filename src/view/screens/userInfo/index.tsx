import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export function UserInfo () {
  const { user } = useAuth()

  return (
    <div>
      <h2>Informações do Usuario</h2>
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
  )
}

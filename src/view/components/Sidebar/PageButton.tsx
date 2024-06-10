import { ToggleGroupItem } from './style'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { UserRole } from '@/domain/entities/User/UserRoules'
import { type ToggleGroupItemProps } from '@radix-ui/react-toggle-group'
import React from 'react'

interface Props extends ToggleGroupItemProps {
  permission: UserRole
}

export function PageButton ({ value, children, permission, ...rest }: Props) {
  const navigate = useNavigate()
  const { verifyUserPermisson } = useAuth()

  return (
    <>
      {
        verifyUserPermisson(permission) &&
        <ToggleGroupItem {...rest} onClick={() => { navigate(value) }} value={value}>
          {children}
        </ToggleGroupItem>
      }
    </>
  )
}

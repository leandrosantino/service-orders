import React from 'react'
import { Overlay } from './style'
import { type ReactNode } from 'react'

interface DialogCustomProps {
  children: ReactNode
  onFinally: () => void
}

export function DialogCustom ({ children, onFinally }: DialogCustomProps) {
  return (
    <>
      <Overlay
        onClick={() => { onFinally() }}
      />
      {children}
    </>
  )
}

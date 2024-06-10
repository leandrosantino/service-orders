import { useContext } from 'react'
import { DialogContext } from '../contexts/dialogContext'

export function useDialog () {
  const dialog = useContext(DialogContext)
  return dialog
}

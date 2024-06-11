import { useContext } from 'react'
import { sideBarContext } from '../contexts/sideBarContext'

export function useSideBarShow () {
  return useContext(sideBarContext)
}

import { useContext } from 'react'
import { ThemeModeContext } from '../contexts/themeContext'

export function useThemeMode () {
  return useContext(ThemeModeContext)
}

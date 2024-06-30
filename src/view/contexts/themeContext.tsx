import { type ReactNode, createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  yellow,
  yellowDark
} from '@radix-ui/colors'
import React from 'react'

type Mode = 'dark' | 'light'

interface ThemeModeContextProps {
  mode: Mode
  setMode: (mode: Mode) => void
}

const colors = {
  light: {
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...yellow
  },
  dark: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...yellowDark
  }
}

export interface Theme {
  colors: typeof colors
  mode: Mode
}

export const ThemeModeContext = createContext({} as ThemeModeContextProps)
const { Provider } = ThemeModeContext

export function ThemeModeProvider ({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')

  return (
    <Provider
      value={{ mode, setMode }}
    >
      <ThemeProvider
        theme={{
          colors,
          mode: 'light'
        }}
      >
        {children}
      </ThemeProvider>
    </Provider >
  )
}

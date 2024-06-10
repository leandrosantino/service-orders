import React, { type ReactNode, createContext, useState, useEffect } from 'react'

interface SideBarContextProps {
  showSideBar: boolean
  setShowSideBar: (value: boolean) => void
}

export const sideBarContext = createContext({} as SideBarContextProps)
const { Provider } = sideBarContext

export function SideBarContextProvider ({ children }: { children: ReactNode }) {
  const [showSideBar, setShowSideBar] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 1000) {
      setShowSideBar(true)
    }
  }, [])

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) {
      setShowSideBar(true)
      return
    }
    setShowSideBar(false)
  })

  return (
    <Provider
      value={{ showSideBar, setShowSideBar }}
    >
      {children}
    </Provider>
  )
}
